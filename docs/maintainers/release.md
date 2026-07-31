# Release

本文说明 Annil 的发布阶段、门禁和失败状态。不得记录 token 值或个人凭据。

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

向 `main` 推送后，Release Please 根据提交历史维护 release PR、版本和 CHANGELOG。GitHub release 创建后，发布 job 才执行安装、构建、coverage、Codecov 上传和 npm publish。

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

`npm run ship -- "type: message"` 会暂存并提交全部修改、运行非 watch Jest、rebase、推送分支、创建或复用 PR、等待 Actions 并自动合并。

边界：

- 需要 `GH_TOKEN` 或 `GITHUB_TOKEN`；
- 不允许在 base 分支执行；
- 远端分支存在时使用 `--force-with-lease`；
- 脚本只运行 Jest，不替代 `pnpm check` 和 build；
- 它不执行 npm 发布；
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
