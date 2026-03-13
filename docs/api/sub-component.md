# SubComponent

::: warning
`SubComponent` 属于历史文档方案。新项目建议优先使用 `CustomComponent` 与 `ChunkComponent`。
:::

## 当前状态

- 保留本页用于旧项目迁移参考。
- 新文档主线见：[CustomComponent](./custom-component.md)、[ChunkComponent](./chunk-component.md)。

`SubComponent` 是组件构建函数之一，用于组织复杂页面中的局部逻辑，并与组件类型建立强约束。

::: warning
为了支持外部泛型，`SubComponent` 为高阶函数，需调用两次。
:::

## 选项字段

### inherit

- 类型：`InheritConstraint`
- 说明：运行时可忽略，主要用于 TS 场景下的数据来源约束和字段提示。

### data

- 类型：`SubDataConstraint`
- 说明：定义子组件本地数据。

### computed

- 类型：`SubComputedConstraint`
- 说明：定义子组件计算属性。

### store

- 类型：`SubStoreConstraint`
- 说明：定义基于 `mobx` 的响应式映射字段；可通过 `disposer.storeFields()` 取消监听。

### events

- 类型：`SubEventsConstraint`
- 说明：定义子组件事件处理函数，支持事件参数泛型扩展。

### watch

- 类型：`SubWatchOption`
- 说明：类似 `observers`，支持深度比较和旧值参数，可监听根组件与子组件相关数据。

## 与 RootComponent 对齐的字段

- `pageLifetimes`
- `lifetimes`
- `observers`
- `methods`（带字段前缀检测）
- `behaviors`
- `externalClasses`

## 参考

- 历史方案说明页（当前文档仅用于兼容迁移）
