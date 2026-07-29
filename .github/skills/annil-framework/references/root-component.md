# RootComponent

`RootComponent` 声明宿主组件或页面的公共状态与逻辑，使用 `RootComponent<子组件文档列表>()({...})`。

## 稳定语义

- `isPage: true` 切换到页面语义，影响 `DefineComponent` 的 `path`、页面生命周期和 `customEvents` 可用性。
- `properties` 是外部输入；`data` 是内部数据；`store` 是 MobX 响应式映射；`computed` 是派生数据。
- `events` 处理 WXML 或子组件事件；`customEvents` 定义组件对外事件。
- `watch`、`observers`、`lifetimes`、`pageLifetimes` 的类型由已声明数据和页面状态推导。
- 复杂属性或事件载荷用 `DetailedType<T>` 精确声明。

## 修改或排错

同时读取：

- [实现](../../../../src/api/RootComponent/index.ts)
- [返回类型](../../../../src/api/RootComponent/returnType.ts)
- [文档](../../../../docs/api/root-component.md)
- [测试目录](../../../../jest)

只继续进入发生问题的字段子目录，例如 `Properties/`、`Events/`、`Computed/` 或 `Watch/`。
