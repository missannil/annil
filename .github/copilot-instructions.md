# Annil 开发约束

- `src/index.ts` 是公共导出边界；内部深路径不默认属于公共 API。修改 `src`，不直接修改生成目录 `dist`。
- 只处理目标实现、直接类型依赖和最近测试；行为变化更新最小测试，公共契约变化同步对应 `docs/api` 文档。
- 区分框架契约与消费项目约定，不把业务目录、样式或字段模式加入框架约束。
- 编写 Chunk WXML 时，节点 `id` 的稳定名称须对应 Chunk 变量名和 `Prefix`：静态写 `xxx`，动态写 `${{动态变量}}_xxx`（如 `id="${{index}}_customBtn"`）；动态值放在前面，保留 `_<Chunk 名称>` 后缀。该规则用于 WXML/工具识别，不代表 Annil 运行时读取 `id`；细节以 `docs/api/chunk-component.md` 为准。
- 以 `src/index.ts`、目标源码和最近测试核对行为；公共 API 语义查 `docs/api/`，架构、兼容、测试和发布规则查 `docs/maintainers/`。涉及 `vscode-annil`、WXML、组件文档或前缀时，单独核对外部工具协议。
- 使用 `pnpm check` 做阶段验证；运行时变化执行目标 Jest，公共出口、依赖或发布相关变化再执行构建核验。

## 类型性能与重构

- `src/**/*.test.ts` 是编译期类型测试，Jest 不执行；泛型、组件文档或类型约束变化先运行 `tsc --noEmit`。
- 对比性能时固定输入：`tsc --noEmit --extendedDiagnostics` 覆盖类型测试，`tsc -p tsconfig.build.json --extendedDiagnostics` 衡量公共声明。`CustomComponent`、`DefineComponent`、`CustomEvents` 目录下的 `Performance.test.ts` fixture 会增加工作负载，不代表实现回退。
- 先有覆盖再改类型；每次只做一个可撤回的局部实验。泛型 helper、默认泛型缓存或重排可能增加实例化或改变推导顺序，性能回退或类型行为变化即撤回。
- `IfExtends` 是非分发的 `[A] extends [B]`；替换时保留方向、顺序和默认分支。`hry-types` 的公开类型与 `_` 前缀类型可能有不同约束，迁移前验证 `any`、`never`、联合和可选字段。
- `pnpm check` 或 `pnpm fmt` 若被 minimum release age 策略阻断，使用本地 `tsc`、`eslint`、必要的 Jest、声明构建和 `git diff --check` 代替，并说明限制。
