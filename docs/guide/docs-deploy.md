# 文档部署（GitHub Pages + 可选 Gitee）

本文档用于说明如何在不影响现有测试与发布流程的前提下，部署 VitePress 文档站。

## 现有工作流说明

仓库已新增文档发布工作流：

- `.github/workflows/docs-deploy.yml`：只在 `main` 分支且文档相关文件变更时触发；
- `.github/workflows/test.yml`：已忽略文档-only 变更，不会因为只改文档触发全量测试。

因此：

- 改代码：仍走原有测试与发版流程；
- 改文档：走文档部署流程，不干扰 npm 发布链路。

## 多项目预留方案（以后可直接复用）

推荐采用「每个仓库一个 Project Pages + 一个总入口仓库」：

- 每个项目仓库：各自维护 `docs/` 与 `docs-deploy.yml`
- 统一访问：可再建 `missannil.github.io` 仓库作为导航首页
- 访问形式：`https://<user>.github.io/<repo>/`

本仓库工作流已支持按仓库名自动推导 base：

- 默认 base = `/<repo>/`
- 若需要自定义，再设置变量 `DOCS_BASE`

因此你后续其他开源项目可直接复制本工作流，通常不需要改 YAML。

## 一、启用 GitHub Pages

1. 进入仓库 `Settings` -> `Pages`
2. 在 `Build and deployment` 中选择 `Source: GitHub Actions`
3. 合并任意一次文档改动到 `main`，等待 `Docs Deploy` 工作流执行完成
4. 访问地址通常为：

`https://<你的用户名>.github.io/<仓库名>/`

> 当前仓库默认 base 为 `/annil/`（可通过变量覆盖）。

## 二、可选变量（Repository Variables）

进入仓库 `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`：

- `DOCS_BASE`：GitHub Pages 的站点 base，默认 `/annil/`
- `GITEE_DOCS_BASE`：Gitee Pages 站点 base，默认 `/`
- `GITEE_PAGES_BRANCH`：Gitee Pages 发布分支，默认 `gh-pages`

> 现在工作流默认会自动使用 `/<仓库名>/`，所以 `DOCS_BASE` 可不设置。

## 三、启用 Gitee 同步（可选）

进入仓库 `Settings` -> `Secrets and variables` -> `Actions` -> `Secrets`：

- `GITEE_REPO`：Gitee 仓库 SSH 地址（例如 `git@gitee.com:xxx/annil-docs.git`）
- `GITEE_SSH_PRIVATE_KEY`：可推送到 Gitee 仓库的私钥内容
- `GITEE_USER`（可选）：提交用户名
- `GITEE_EMAIL`（可选）：提交邮箱

工作流检测到上述关键 secret 后，会自动执行 Gitee 同步步骤。

## 当前项目（annil）你现在要做的配置

按顺序完成下面 6 步即可：

1. GitHub 仓库设置 `Settings -> Pages`，`Source` 选择 `GitHub Actions`
2. （可选）在 `Variables` 新增 `DOCS_BASE=/annil/`（不配也可以）
3. 提交一次文档变更到 `main`（比如本文件），触发 `Docs Deploy`
4. 在 `Actions` 页确认 `Docs Deploy` 成功
5. 访问 `https://missannil.github.io/annil/` 验证站点
6. 若要大陆入口，再配置 Gitee 的 `Secrets/Variables` 并开启 Gitee Pages

## 四、Gitee Pages 发布设置

在 Gitee 仓库中：

1. 开启 Gitee Pages
2. 选择发布分支（与 `GITEE_PAGES_BRANCH` 一致，默认 `gh-pages`）
3. 若 Gitee Pages 需要手动更新，可在 Gitee 页面点击更新发布

## 五、常见问题

### 1）GitHub Pages 打开 404

- 确认 `Pages` 来源已选 `GitHub Actions`
- 确认 `docs-deploy.yml` 已成功执行
- 确认 `DOCS_BASE` 与访问路径匹配

### 2）静态资源路径错乱

- GitHub Pages 场景，优先使用 `/仓库名/` 作为 base（本仓库默认 `/annil/`）
- Gitee 若绑定根路径，通常使用 `/`

### 3）只改文档是否会触发发版

不会。发版仍由原有 `release-please` 工作流控制。
