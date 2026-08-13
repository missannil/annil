# Annil 开发约束

- `src/index.ts` 是公共导出边界；内部深路径不默认属于公共 API。修改 `src`，不直接修改生成目录 `dist`。
- 只读取和修改目标实现、直接类型依赖及最近测试，不扫描或重写无关目录。
- 行为变化更新最小测试；公共契约变化同步对应 `docs/api` 文档。
- 区分框架契约与消费项目约定，不把业务目录、样式或字段模式加入框架约束。
- 使用 `pnpm check` 做阶段验证；运行时变化执行目标 Jest；公共出口、依赖或发布相关变化再执行构建核验。

## 文档路由

- 公共 API 语义以 `docs/api/` 为唯一解释来源；架构、契约、测试和发布规则以 `docs/maintainers/` 为准。
- 行为冲突时核对 `src/index.ts`、目标实现、直接类型依赖和最近测试；不要用代理定制文件建立新的框架事实。
- 涉及 RootComponent 内置状态（包括 `attached`）时，读取 `docs/api/root-component.md` 并核对对应源码和测试。
- 涉及 `vscode-annil` 或 WXML 静态分析时，按 `docs/maintainers/contracts-and-compatibility.md` 单独核对外部工具协议。
