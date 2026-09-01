#!/usr/bin/env node
/* global console, process */

import { spawnSync } from "node:child_process";

const DEFAULT_BRANCH = "miss";
const DEFAULT_REMOTE = "origin";

function printHelp() {
  console.log(`Usage:
  npm run ship -- "type: message"

Options:
  --branch <branch>  Branch to publish (default: ${DEFAULT_BRANCH})
  --remote <name>    Git remote to use (default: ${DEFAULT_REMOTE})
  --help             Show this help message

What it does:
  1. git add .
  2. git commit -m "..." (the Husky pre-commit checks run here)
  3. Retry once when the hook only formatted files
  4. git push --set-upstream <remote> <branch>

After the push, review and merge the pull request on GitHub. Release Please
will then create or update its release PR on main; approve that PR manually
to start the publish workflow.
`);
}

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const options = { branch: DEFAULT_BRANCH, remote: DEFAULT_REMOTE, help: false, commitMessage: "" };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--help" || value === "-h") {
      options.help = true;
      continue;
    }
    if (value === "--branch" || value === "--remote") {
      const nextValue = argv[index + 1];
      if (!nextValue) fail(`Missing value after ${value}.`);
      options[value === "--branch" ? "branch" : "remote"] = nextValue;
      index += 1;
      continue;
    }
    options.commitMessage = options.commitMessage ? `${options.commitMessage} ${value}` : value;
  }

  return options;
}

function run(command, args, { capture = false } = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const stderr = capture ? result.stderr?.trim() : "";
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status}${stderr ? `\n${stderr}` : ""}`,
    );
  }
  return capture ? result.stdout.trim() : "";
}

function runAllowFailure(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: "inherit" });
  if (result.error) throw result.error;
  return result.status === 0;
}

function git(args, options) {
  return run("git", args, options);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.commitMessage) {
    printHelp();
    fail("Missing commit message.");
  }

  const currentBranch = git(["branch", "--show-current"], { capture: true });
  if (currentBranch !== options.branch) {
    fail(`Refusing to run on ${currentBranch || "detached HEAD"}; expected ${options.branch}.`);
  }
  git(["remote", "get-url", options.remote], { capture: true });
  console.log(`Branch: ${currentBranch}`);
  console.log(`Remote: ${options.remote}`);
  console.log(`Commit: ${options.commitMessage}`);

  git(["add", "."]);
  const diffBeforeCommit = git(["diff", "--binary", "HEAD"], { capture: true });
  const committed = runAllowFailure("git", ["commit", "-m", options.commitMessage]);
  if (!committed) {
    const diffAfterCommit = git(["diff", "--binary", "HEAD"], { capture: true });
    if (diffBeforeCommit === diffAfterCommit) {
      fail("Commit failed without formatting changes; inspect the hook output.");
    }
    console.log("The pre-commit hook formatted files. Staging them and retrying the commit...");
    git(["add", "."]);
    git(["commit", "-m", options.commitMessage]);
  }

  git(["push", "--set-upstream", options.remote, options.branch]);
  console.log("Pushed successfully. Continue with the GitHub pull request and Release Please approval.");
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
}
