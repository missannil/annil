---
name: annil-release
description: "向远程仓库推送 Annil 变更或发布 Annil 时使用：同步 main、提交并推送 miss、自动合并业务 PR，按需处理 Release Please 和 npm 发布工作流。"
argument-hint: "可选：提交信息，例如 deps: upgrade hry-types"
user-invocable: true
disable-model-invocation: false
---

# Annil 远程推送与发布流程

当用户说“推送远程”“合并到 main”“发布”或明确调用此 Skill 时，按以下流程执行。默认允许自动登录后的 GitHub API 操作、PR 合并和远程分支删除；不要等待用户点击。只有凭据、权限、Action、测试、构建或 npm 发布失败时停止并报告。

## 开始前检查

1. 阅读 `docs/maintainers/release.md`，确认当前变更的版本影响和文档要求。
2. 检查 `git status --short --branch`，必须位于 `miss` 分支；不要切换或覆盖用户未提交的修改。
3. 执行 `gh auth status --hostname github.com` 检查登录状态；未登录时执行 `gh auth login --hostname github.com --web`，再检查当前账号对仓库的 push 权限。不要读取或打印 token 值。
4. 确认提交信息符合 commitlint，格式为 `type: message`。若用户未提供，先询问，不猜测版本或提交类型。

## 自动执行

优先运行：

```sh
npm run ship -- "type: message"
```

该命令会先执行 `git pull origin main --rebase`，确保推送前基于远程最新 `main`，再执行 `git add .`、提交并触发 Husky。若 pre-commit 因 dprint 格式化而失败，脚本会自动再次暂存并提交；若是 lint、类型检查或测试失败，则停止并报告原始错误。之后推送 `origin/miss`，自动创建或复用 `miss -> main` PR，等待 GitHub Actions，通过后合并并删除远程 `miss` 分支。远程 `main` 更新后，应再次同步本地 `main`，再继续 Release Please 和发布状态检查。

如果脚本因未登录、权限不足、当前分支、rebase 冲突或未解决的检查失败而停止，完成登录或修复问题后从失败阶段继续。不要自行修改版本号、CHANGELOG 或 `dist`。

## 自动完成的 GitHub 步骤

1. 合并 `miss -> main` 后删除远程 `miss` 分支；远程分支已被 GitHub 自动删除时视为成功。
2. 将本地分支同步到远程最新 `main`（`git pull origin main --rebase`）；若当前仍在 `miss`，先切换到 `main`，再执行同步。
3. 检查是否创建或更新以 `release-please--branches--main` 开头的 PR；没有则在确认本地与远程 `main` 一致后结束。
4. 仅在存在 Release Please PR 时，自动合并该 PR 并删除它创建的远程分支。
5. Release Please 合并并更新远程仓库后，再次同步本地 `main`。
6. 等待 `build-and-publish` 完成，确认 build、coverage、Codecov 和 npm publish 成功。
7. 发布工作流成功后，报告 GitHub Release、npm 包和目标 dist-tag 的状态。

## 停止条件

只根据终端输出和 GitHub Actions 报告状态。遇到 gh 登录失败、GitHub 权限不足、PR 无法合并、Action 版本或配置错误、测试/构建失败、npm publish 失败时停止；可以先修复仓库中的 Action 配置或代码问题，再从失败阶段继续，但不要猜测或打印凭据，也不要删除 release、修改 tag 或重复发布 npm 包。
