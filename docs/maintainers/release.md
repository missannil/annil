# Remote Push and Release

本文说明 Annil 的远程推送、合并、发布阶段、门禁和失败状态。不得记录 token 值或个人凭据。

## 1. 发布门禁

发布候选应确认：

- 工作区和目标分支正确；
- 提交类型与兼容影响一致；
- `pnpm check`、完整 Jest、coverage 和 build 有成功证据；
- 公共契约变化已同步 API 文档；
- 公共出口、package 入口、版本和 CHANGELOG 一致；
- 模拟器未覆盖风险已记录。

测试层次和模拟边界见 [Testing](./testing.md)。

## 2. Release Please

向 `main` 推送后，Release Please 根据提交历史判断是否维护 release PR、版本和 CHANGELOG。不是每次推送都会产生发布 PR；只有 GitHub release 创建后，发布 job 才执行安装、构建、coverage、Codecov 上传和 npm publish。

当前 npm tag 映射：

- `alpha` → `alpha`；
- `beta` → `beta`；
- `dev` → `dev`；
- `rc` → `rc`；
- 无上述后缀 → 默认 tag。

GitHub release、npm 包和文档部署是三个独立状态，任何一个成功都不能证明另外两个成功。

## 3. 文档部署

`docs/**` 或文档 workflow 变化时独立构建并部署 GitHub Pages。base 来自仓库变量 `DOCS_BASE`，未配置时按仓库名生成默认值。

## 4. ship 脚本

`npm run ship -- "type: message"` 会先执行 `git pull origin main --rebase`，确保推送前基于远程最新 `main`，确认当前为 `miss` 分支，暂存并提交全部修改，触发 Husky 检查（格式化导致的失败会自动重试一次），然后推送 `origin/miss`。脚本会自动创建或复用并合并 `miss -> main` PR，删除远程 `miss`；业务 PR 合并后，发布操作应先切换到 `main` 并执行 `git pull origin main --rebase`。如果这次推送没有产生 Release Please PR，同步完成后即可结束；只有产生 Release Please PR 时，才继续合并该 PR 并等待发布 workflow。

同步原则：向远程推送或依赖远程状态前，先将当前工作基线 rebase 到 `origin/main`；远程仓库发生合并、发布提交或其他更新后，再拉取最新 `main`，避免本地状态落后或停留在已删除的工作分支。

业务 PR 会执行完整测试；Release Please 临时 PR 跳过重复的 `Test PR` workflow，发布 workflow 仍会执行构建和 coverage。

边界：

- 只允许在 `miss` 分支执行；
- 需要 GitHub CLI `gh` 登录，且当前账号必须有仓库写权限；
- 脚本通过 GitHub API 创建、合并 PR 和删除远程分支；
- 它不在本地执行 npm 发布，最终发布由 GitHub Actions 完成；
- 不替代 GitHub Actions 的完整测试、coverage 和 build；
- secret 只在安全环境配置，不写入仓库或 AI 知识文件。

## 5. 失败状态

发生失败时分别确认：

1. release PR 是否创建或更新；
2. GitHub release 是否创建；
3. build 是否成功；
4. coverage 和 Codecov 是否成功；
5. npm 包及目标 tag 是否存在；
6. 文档是否部署；
7. ship PR 是否通过检查并合并。

只报告由命令、workflow、GitHub 或 npm 证实的状态。

## 6. 未定义的恢复政策

仓库目前没有正式规定：

- 错误 npm 版本应 deprecate、追加 patch 还是调整 dist-tag；
- GitHub release 已创建但 npm 失败时是否删除 release；
- alpha、beta、dev、rc 的晋升路径；
- 发布权限责任人和 secret 轮换周期；
- 生产发布的人工审批要求。

这些政策确认前，审计只能识别状态和风险，不得自行删除 release、修改 tag、publish、push 或 merge。
