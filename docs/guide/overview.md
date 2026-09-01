# 了解 Annil

Annil 是面向微信小程序原生开发的 TypeScript 框架，基于原生组件 API 提供更强的类型安全、更清晰的组件结构，以及可组合的响应式能力。

## 核心能力

- **类型安全的组件构建**：为 properties、events、methods、watch 等配置提供类型提示和检查。
- **组件文档类型**：通过 `DefineComponent` 生成和复用组件文档类型，支持组件之间的类型化协作。
- **响应式状态能力**：使用 `computed`、`watch` 和 `store` 管理派生状态、变化监听和全局状态。
- **渐进式接入**：保留微信小程序原生开发方式，可在新项目或已有项目中逐步使用。
- **类型化导航**：根据页面文档约束页面路径和跳转参数，减少导航调用错误。

## 推荐阅读路径

1. 阅读[安装与配置](./getting-started.md)，完成项目接入。
2. 阅读[设计思想](./design-idea.md)，了解 Annil 如何组织组件和类型。
3. 阅读 [API 总览](../api/overview.md)，选择对应的组件构建 API。
4. 通过[示例总览](../examples/overview.md)学习 `computed`、`watch` 和 `store`。

## API 选择

- 使用全局状态和页面级能力时，从 `RootComponent` 开始。
- 构建普通自定义组件时，使用 `CustomComponent`。
- 需要拆分和复用组件配置时，使用 `ChunkComponent`。
- 需要导出组件文档类型或构建页面时，使用 `DefineComponent`。
