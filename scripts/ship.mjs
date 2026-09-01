#!/usr/bin/env node
/* global console, process, URL, URLSearchParams */

import { spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const DEFAULT_BASE = "main";
const DEFAULT_BRANCH = "miss";
const DEFAULT_REMOTE = "origin";
const CHECK_INTERVAL_MS = 15_000;
const CHECK_TIMEOUT_MS = 60 * 60 * 1000;
const RELEASE_BRANCH_PREFIX = "release-please--branches--";

function printHelp() {
  console.log(`Usage:
  npm run ship -- "type: message"

Options:
  --base <branch>    Base branch (default: ${DEFAULT_BASE})
  --branch <branch>  Release branch (default: ${DEFAULT_BRANCH})
  --remote <name>    Git remote (default: ${DEFAULT_REMOTE})
  --help             Show this help message

The command synchronizes main, commits and pushes the release branch, merges
its GitHub PR, removes that remote branch, merges the Release Please PR,
removes its generated branch, and waits for the publish workflow to finish.
GitHub CLI (gh) login with repository write access is required.
`);
}

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const options = {
    base: DEFAULT_BASE,
    branch: DEFAULT_BRANCH,
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
    if (["--base", "--branch", "--remote"].includes(value)) {
      const nextValue = argv[index + 1];
      if (!nextValue) fail(`Missing value after ${value}.`);
      options[value.slice(2)] = nextValue;
      index += 1;
      continue;
    }
    options.commitMessage = options.commitMessage ? `${options.commitMessage} ${value}` : value;
  }
  return options;
}

function run(command, args, { capture = false, allowFailure = false, input } = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
    input,
  });
  if (result.error) throw result.error;
  if (!allowFailure && result.status !== 0) {
    const stderr = capture ? result.stderr?.trim() : "";
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status}${stderr ? `\n${stderr}` : ""}`,
    );
  }
  return { ok: result.status === 0, stdout: capture ? result.stdout.trim() : "" };
}

function git(args, options) {
  return run("git", args, options).stdout;
}

function checkGhAuth() {
  const authStatus = run("gh", ["auth", "status", "--hostname", "github.com"], {
    capture: true,
    allowFailure: true,
  });
  if (!authStatus.ok) {
    console.log("GitHub CLI is not logged in. Opening browser login...");
    run("gh", ["auth", "login", "--hostname", "github.com", "--web"]);
  }
}

function checkPushPermission(owner, repo) {
  const permission = run("gh", ["api", `repos/${owner}/${repo}`, "--jq", ".permissions.push"], {
    capture: true,
    allowFailure: true,
  });
  if (!permission.ok) fail("Unable to check GitHub repository permissions. Run `gh auth status` and try again.");
  if (permission.stdout !== "true") fail(`GitHub account does not have push permission for ${owner}/${repo}.`);
}

function parseRemoteUrl(remoteUrl) {
  const cleaned = remoteUrl.replace(/\.git$/u, "");
  const sshMatch = cleaned.match(/^git@github\.com:([^/]+)\/([^/]+)$/u);
  if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };
  try {
    const url = new URL(cleaned);
    const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/");
    if (!owner || !repo) fail(`Cannot parse GitHub repository from remote URL: ${remoteUrl}`);
    return { owner, repo };
  } catch {
    fail(`Cannot parse GitHub repository from remote URL: ${remoteUrl}`);
  }
}

async function githubRequest(method, path, body) {
  const args = ["api", path, "--method", method, "--hostname", "github.com"];
  const result = run("gh", args, {
    capture: true,
    input: body ? JSON.stringify(body) : undefined,
  });
  return result.stdout ? JSON.parse(result.stdout) : null;
}

async function findPullRequest(owner, repo, head, base) {
  const params = new URLSearchParams({ state: "open", head: `${owner}:${head}`, base, per_page: "100" });
  const pullRequests = await githubRequest("GET", `/repos/${owner}/${repo}/pulls?${params}`);
  return pullRequests[0] ?? null;
}

async function createPullRequest(owner, repo, head, base, title) {
  return githubRequest("POST", `/repos/${owner}/${repo}/pulls`, {
    title,
    head,
    base,
    body: "Automated by npm run ship.",
    maintainer_can_modify: true,
  });
}

function isPassingConclusion(conclusion) {
  return ["success", "neutral", "skipped"].includes(conclusion);
}

async function waitForChecks(owner, repo, pullRequest, { requireChecks = true } = {}) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < CHECK_TIMEOUT_MS) {
    const [details, checks] = await Promise.all([
      githubRequest("GET", `/repos/${owner}/${repo}/pulls/${pullRequest.number}`),
      githubRequest("GET", `/repos/${owner}/${repo}/commits/${pullRequest.head.sha}/check-runs?per_page=100`),
    ]);
    const actionRuns = checks.check_runs.filter((run) => run.app?.slug === "github-actions");
    const pending = actionRuns.some((run) => run.status !== "completed");
    const failed = actionRuns.find((run) => run.status === "completed" && !isPassingConclusion(run.conclusion));
    console.log(
      `PR #${details.number} checks: ${
        actionRuns.map((run) => `${run.name}:${run.conclusion ?? run.status}`).join(", ") || "pending"
      }`,
    );
    if (failed) fail(`PR #${details.number} has a failing GitHub Actions check: ${failed.name}.`);
    if (!pending && (actionRuns.length > 0 || !requireChecks)) return details;
    await delay(CHECK_INTERVAL_MS);
  }
  fail(`Timed out waiting for checks on PR #${pullRequest.number}.`);
}

async function mergePullRequest(owner, repo, pullRequest) {
  if (pullRequest.merged) return pullRequest;
  const result = await githubRequest("PUT", `/repos/${owner}/${repo}/pulls/${pullRequest.number}/merge`, {
    merge_method: "merge",
  });
  if (!result.merged) fail(`PR #${pullRequest.number} was not merged: ${result.message ?? "unknown reason"}.`);
  return result;
}

async function deleteRemoteBranch(owner, repo, branch) {
  try {
    await githubRequest("DELETE", `/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`);
    console.log(`Deleted remote branch ${branch}.`);
  } catch (error) {
    if (error instanceof Error && error.message.includes(" 404 ")) {
      console.log(`Remote branch ${branch} is already deleted.`);
      return;
    }
    fail(`Could not delete remote branch ${branch}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function waitForReleasePullRequest(owner, repo, base) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < CHECK_TIMEOUT_MS) {
    const pullRequests = await githubRequest(
      "GET",
      `/repos/${owner}/${repo}/pulls?state=open&base=${encodeURIComponent(base)}&per_page=100`,
    );
    const releasePullRequest = pullRequests.find((pullRequest) =>
      pullRequest.head.ref.startsWith(`${RELEASE_BRANCH_PREFIX}${base}`)
      || pullRequest.title.toLowerCase().includes("release")
    );
    if (releasePullRequest) return releasePullRequest;
    console.log("Waiting for Release Please to create its pull request...");
    await delay(CHECK_INTERVAL_MS);
  }
  fail("Timed out waiting for the Release Please pull request.");
}

async function waitForWorkflow(owner, repo, mergeTime) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < CHECK_TIMEOUT_MS) {
    const runs = await githubRequest(
      "GET",
      `/repos/${owner}/${repo}/actions/workflows/release-please.yml/runs?per_page=20`,
    );
    const run = runs.workflow_runs.find((candidate) => new Date(candidate.created_at).getTime() >= mergeTime);
    if (run) {
      if (run.status !== "completed") {
        console.log(`Waiting for release workflow #${run.run_number}: ${run.status}.`);
        await delay(CHECK_INTERVAL_MS);
        continue;
      }
      if (run.conclusion !== "success") {
        fail(
          `Release workflow #${run.run_number} failed with ${run.conclusion}. Check npm token, permissions, or workflow errors.`,
        );
      }
      console.log(`Release workflow #${run.run_number} completed successfully.`);
      return;
    }
    console.log("Waiting for the release workflow to start...");
    await delay(CHECK_INTERVAL_MS);
  }
  fail("Timed out waiting for the release workflow.");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return printHelp();
  if (!options.commitMessage) {
    printHelp();
    fail("Missing commit message.");
  }

  const currentBranch = git(["branch", "--show-current"], { capture: true });
  if (currentBranch !== options.branch) {
    fail(`Refusing to run on ${currentBranch || "detached HEAD"}; expected ${options.branch}.`);
  }
  const remoteUrl = git(["remote", "get-url", options.remote], { capture: true });
  const { owner, repo } = parseRemoteUrl(remoteUrl);
  checkGhAuth();
  checkPushPermission(owner, repo);

  const hasWorkingTreeChanges = Boolean(git(["status", "--porcelain"], { capture: true }));
  if (hasWorkingTreeChanges) {
    git(["stash", "push", "--include-untracked", "--message", "annil-release-before-rebase"]);
    try {
      git(["pull", options.remote, options.base, "--rebase"]);
    } catch (error) {
      git(["stash", "pop"]);
      throw error;
    }
    git(["stash", "pop"]);
  } else {
    git(["pull", options.remote, options.base, "--rebase"]);
  }
  git(["add", "."]);
  const diffBeforeCommit = git(["diff", "--binary", "HEAD"], { capture: true });
  const commitResult = run("git", ["commit", "-m", options.commitMessage], { allowFailure: true });
  if (!commitResult.ok) {
    const diffAfterCommit = git(["diff", "--binary", "HEAD"], { capture: true });
    if (diffBeforeCommit === diffAfterCommit) {
      fail("Commit failed without formatting changes; inspect the hook output.");
    }
    git(["add", "."]);
    git(["commit", "-m", options.commitMessage]);
  }
  git(["push", "--set-upstream", options.remote, options.branch]);

  let pullRequest = await findPullRequest(owner, repo, options.branch, options.base);
  if (!pullRequest) {
    pullRequest = await createPullRequest(owner, repo, options.branch, options.base, options.commitMessage);
  }
  console.log(`Release PR: #${pullRequest.number} ${pullRequest.html_url}`);
  await waitForChecks(owner, repo, pullRequest);
  await mergePullRequest(owner, repo, pullRequest);
  await deleteRemoteBranch(owner, repo, options.branch);

  const releasePullRequest = await waitForReleasePullRequest(owner, repo, options.base);
  console.log(`Release Please PR: #${releasePullRequest.number} ${releasePullRequest.html_url}`);
  await waitForChecks(owner, repo, releasePullRequest, { requireChecks: false });
  const mergeTime = Date.now();
  await mergePullRequest(owner, repo, releasePullRequest);
  await deleteRemoteBranch(owner, repo, releasePullRequest.head.ref);
  await waitForWorkflow(owner, repo, mergeTime);
  console.log("Release completed successfully.");
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
