#!/usr/bin/env node
/* global console, fetch, process, URL, URLSearchParams */

import { spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const DEFAULT_BASE = "main";
const DEFAULT_REMOTE = "origin";
const DEFAULT_CHECK_INTERVAL_MS = 15_000;
const DEFAULT_CHECK_TIMEOUT_MS = 60 * 60 * 1000;

function printHelp() {
  console.log(`Usage:
  npm run ship -- "type: message"

Options:
  --base <branch>    Target branch for the PR (default: main)
  --remote <name>    Git remote to use (default: origin)
  --help             Show this help message

Environment:
  GH_TOKEN or GITHUB_TOKEN is required for GitHub API access.

What it does:
  1. git add -A
  2. git commit -m "..."
  3. npm run test -- --watch=false --watchAll=false
  4. git pull --rebase <remote> <base>
  5. git push --force-with-lease <remote> <branch>
  6. create or reuse a pull request
  7. wait for GitHub Actions checks
  8. merge the PR automatically
`);
}

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const options = {
    base: DEFAULT_BASE,
    remote: DEFAULT_REMOTE,
    help: false,
    commitMessage: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === "--help" || value === "-h") {
      options.help = true;
      continue;
    }

    if (value === "--base") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        fail("Missing value after --base.");
      }

      options.base = nextValue;
      index += 1;
      continue;
    }

    if (value === "--remote") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        fail("Missing value after --remote.");
      }

      options.remote = nextValue;
      index += 1;
      continue;
    }

    if (!options.commitMessage) {
      options.commitMessage = value;
    } else {
      options.commitMessage = `${options.commitMessage} ${value}`;
    }
  }

  return options;
}

function run(command, args, { capture = false } = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = capture ? result.stderr?.trim() : "";
    const details = stderr ? `\n${stderr}` : "";
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}${details}`);
  }

  return capture ? result.stdout.trim() : "";
}

function git(args, options) {
  return run("git", args, options);
}

function npmRun(args, options) {
  return run("npm", ["run", ...args], options);
}

function hasRemoteBranch(remote, branch) {
  const result = spawnSync("git", ["ls-remote", "--exit-code", "--heads", remote, branch], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error) {
    throw result.error;
  }

  return result.status === 0;
}

function getToken() {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) {
    fail("Missing GH_TOKEN or GITHUB_TOKEN. A GitHub token with repo access is required.");
  }

  return token;
}

function parseRemoteUrl(remoteUrl) {
  const cleaned = remoteUrl.replace(/\.git$/, "");

  const sshMatch = cleaned.match(/^git@github\.com:([^/]+)\/([^/]+)$/u);
  if (sshMatch) {
    return { owner: sshMatch[1], repo: sshMatch[2] };
  }

  try {
    const url = new URL(cleaned);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/");

    if (!owner || !repo) {
      fail(`Cannot parse GitHub repository from remote URL: ${remoteUrl}`);
    }

    return { owner, repo };
  } catch {
    fail(`Cannot parse GitHub repository from remote URL: ${remoteUrl}`);
  }
}

async function githubRequest(token, method, path, body) {
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "annil-ship-script",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `GitHub API ${method} ${path} failed: ${response.status} ${response.statusText}${text ? `\n${text}` : ""}`,
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function findOpenPullRequest(token, owner, repo, head, base) {
  const search = new URLSearchParams({
    state: "open",
    head: `${owner}:${head}`,
    base,
  });

  const pullRequests = await githubRequest(token, "GET", `/repos/${owner}/${repo}/pulls?${search.toString()}`);
  return Array.isArray(pullRequests) && pullRequests.length > 0 ? pullRequests[0] : null;
}

async function createPullRequest(token, owner, repo, branch, base, title) {
  return githubRequest(token, "POST", `/repos/${owner}/${repo}/pulls`, {
    title,
    head: branch,
    base,
    body: "Automated by npm run ship.",
    maintainer_can_modify: true,
  });
}

function summarizeChecks(checkRuns, combinedStatus) {
  const lines = [];

  if (combinedStatus?.state) {
    lines.push(`status=${combinedStatus.state}`);
  }

  for (const run of checkRuns) {
    const conclusion = run.conclusion ?? run.status;
    lines.push(`${run.name}:${conclusion}`);
  }

  return lines.length > 0 ? lines.join(", ") : "no checks yet";
}

function isPassingConclusion(conclusion) {
  return conclusion === "success" || conclusion === "neutral" || conclusion === "skipped";
}

async function waitForChecks(token, owner, repo, pullNumber, timeoutMs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const pullRequest = await githubRequest(token, "GET", `/repos/${owner}/${repo}/pulls/${pullNumber}`);
    const [checkRunsResponse, combinedStatus] = await Promise.all([
      githubRequest(token, "GET", `/repos/${owner}/${repo}/commits/${pullRequest.head.sha}/check-runs?per_page=100`),
      githubRequest(token, "GET", `/repos/${owner}/${repo}/commits/${pullRequest.head.sha}/status`),
    ]);

    const githubActionsRuns = (checkRunsResponse.check_runs ?? []).filter((run) => run.app?.slug === "github-actions");
    const hasPendingActionRuns = githubActionsRuns.some((run) => run.status !== "completed");
    const hasFailedActionRuns = githubActionsRuns.some((run) =>
      run.status === "completed" && !isPassingConclusion(run.conclusion)
    );
    const combinedState = combinedStatus.state;

    console.log(`Waiting for PR #${pullNumber}: ${summarizeChecks(githubActionsRuns, combinedStatus)}`);

    if (combinedState === "failure" || combinedState === "error") {
      fail(`PR #${pullNumber} has failing status checks.`);
    }

    if (hasFailedActionRuns) {
      fail(`PR #${pullNumber} has a failing GitHub Actions check.`);
    }

    if (!hasPendingActionRuns && (combinedState === "success" || githubActionsRuns.length > 0)) {
      return pullRequest;
    }

    await delay(DEFAULT_CHECK_INTERVAL_MS);
  }

  fail(`Timed out waiting for checks on PR #${pullNumber}.`);
}

async function mergePullRequest(token, owner, repo, pullNumber) {
  return githubRequest(token, "PUT", `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`, {});
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  if (!options.commitMessage) {
    printHelp();
    fail("Missing commit message.");
  }

  const token = getToken();
  const currentBranch = git(["branch", "--show-current"], { capture: true });

  if (!currentBranch) {
    fail("Cannot run on a detached HEAD.");
  }

  if (currentBranch === options.base) {
    fail(`Refusing to run on the base branch (${options.base}).`);
  }

  const remoteUrl = git(["remote", "get-url", options.remote], { capture: true });
  const { owner, repo } = parseRemoteUrl(remoteUrl);

  console.log(`Branch: ${currentBranch}`);
  console.log(`Base: ${options.base}`);
  console.log(`Remote: ${options.remote} (${owner}/${repo})`);
  console.log(`Commit: ${options.commitMessage}`);

  git(["add", "-A"]);
  git(["commit", "-m", options.commitMessage]);
  npmRun(["test", "--", "--watch=false", "--watchAll=false"]);
  git(["pull", "--rebase", options.remote, options.base]);

  if (hasRemoteBranch(options.remote, currentBranch)) {
    git(["push", "--force-with-lease", "--set-upstream", options.remote, currentBranch]);
  } else {
    console.log(`Remote branch ${options.remote}/${currentBranch} not found. Creating it...`);
    git(["push", "--set-upstream", options.remote, currentBranch]);
  }

  let pullRequest = await findOpenPullRequest(token, owner, repo, currentBranch, options.base);

  if (!pullRequest) {
    pullRequest = await createPullRequest(token, owner, repo, currentBranch, options.base, options.commitMessage);
    console.log(`Created PR #${pullRequest.number}: ${pullRequest.html_url}`);
  } else {
    console.log(`Reusing PR #${pullRequest.number}: ${pullRequest.html_url}`);
  }

  const readyPullRequest = await waitForChecks(token, owner, repo, pullRequest.number, DEFAULT_CHECK_TIMEOUT_MS);
  await mergePullRequest(token, owner, repo, readyPullRequest.number);

  console.log(`Merged PR #${readyPullRequest.number}: ${readyPullRequest.html_url}`);
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
}
