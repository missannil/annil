---
name: annil-release
description: "发布 Annil 项目时使用：运行 pnpm check、提交符合 commitlint 的变更、推送 miss 分支，并指导 GitHub PR、Release Please 和 npm 发布流程。"
argument-hint: "可选：提交信息，例如 deps: upgrade hry-types"
user-invocable: true
disable-model-invocation: false
---

# Annil 发布流程

当用户说“发布”或明确调用此 Skill 时，按以下流程执行。发布是有不可逆影响的操作，任何 GitHub 登录、审批、合并、Release Please 确认和 npm 发布都必须由用户在 GitHub/npm 页面完成。

## 开始前检查

1. 阅读 `docs/maintainers/release.md`，确认当前变更的版本影响和文档要求。
2. 检查 `git status --short --branch`，必须位于 `miss` 分支；不要切换或覆盖用户未提交的修改。
3. 确认提交信息符合 commitlint，格式为 `type: message`。允许的 type：`build`、`chore`、`ci`、`docs`、`deps`、`feat`、`fix`、`perf`、`refactor`、`revert`、`style`、`test`。
4. 若用户未提供提交信息，先询问，不猜测版本或提交类型。

## 自动执行

优先运行：

```sh
npm run ship -- "type: message"
```

该命令会执行 `git add .`、提交并触发 Husky。若 pre-commit 因 dprint 格式化而失败，脚本会自动再次暂存并提交；若是 lint、类型检查或测试失败，则停止并报告原始错误。最后只推送 `origin/miss`，不会创建、审批或合并 PR，也不会调用 GitHub API，不需要 token。

如果脚本因当前分支或未解决的检查失败而停止，修复问题后重新运行同一命令。不要自行修改版本号、CHANGELOG 或 `dist`。

## 用户确认步骤

推送成功后，提示用户按顺序完成：

1. 登录 GitHub，打开 `miss -> main` 的 PR，等待 `.github/workflows/test.yml` 通过。
2. 完成管理员 review 要求；仓库所有者可按仓库权限选择直接合并，但不要代替用户作出该审批决定。
3. 合并到 `main` 后，等待 `release-please` 创建或更新 release PR。
4. 用户进入 release PR 并点击确认/合并，触发 `build-and-publish`，由 workflow 执行 build、coverage、Codecov 和 npm publish。
5. 用户确认 GitHub Release、npm 包及目标 dist-tag 状态；它们是独立结果，不能用其中一个推断另外两个成功。

## 失败处理

只根据终端输出、GitHub Actions、GitHub Release 和 npm 页面报告状态。不要删除 release、修改 tag、重发 npm 包、强推或合并；这些动作需要用户明确指示和相应恢复策略。
