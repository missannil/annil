# Annil 开发约束

- `src/index.ts` 是公共导出入口；`src/api`、`src/types`、`src/utils` 是源码事实源，不直接修改生成目录 `dist`。
- 修改 API 或类型行为时，先读取目标实现、直接类型依赖和最近的 `jest` 测试，不扫描全部目录。
- 行为变更必须更新最小测试；公共契约变化同步更新对应 `docs/api` 文档。
- 区分框架硬约束与消费项目约定，不把目录、样式或业务模式加入框架契约。
- 涉及 Annil API、组件模型、类型推导或消费项目兼容性时，按需使用 `annil-framework` Skill。
- 消费项目问题以其实际安装版本为准，不默认套用本仓库最新行为。
- 遵循现有 TypeScript、ESLint 和 dprint 风格；仅做当前任务需要的修改。
- 使用 `pnpm check` 做阶段性验证；运行时行为再执行目标 Jest 测试。
