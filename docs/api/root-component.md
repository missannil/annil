# RootComponent

`RootComponent` 是组件构建函数之一，通常与 `DefineComponent`、`SubComponent` 搭配使用。它兼容原生 `Component` 选项，并扩展了 `computed`、`watch`、`store`、`customEvents` 等能力。

::: warning
为了支持外部泛型，`RootComponent` 为高阶函数，需调用两次。
:::

```ts
RootComponent()({
  properties: {
    // ...
  },
  data: {
    // ...
  },
});
```

## 核心扩展字段

### isPage

- 类型：`boolean`
- 默认：`false`
- 说明：标识构建页面（`true`）或组件（`false`）；会影响 `pageLifetimes` 字段类型与 `DefineComponent` 中 `path/name` 的可用性。

### properties

- 说明：支持字段约束和 `value` 类型校验；可通过 `DetailedType<T>` 定义更精确类型。

### computed

- 说明：定义计算属性，依赖数据变化时自动更新。
- 可依赖 `properties`、`data`、`store` 及其他 `computed` 字段。

### store

- 说明：定义基于 `mobx` 的全局响应式数据映射。
- 可通过 `disposer.storeFields()` 取消监听。

### events

- 说明：定义组件事件处理函数。
- 支持事件参数泛型扩展（如 `Detail`、`Dataset`、`Mark`）。

### customEvents

- 说明：定义并通过实例方法直接触发的自定义事件。
- 当 `isPage: true` 时不可用。

### watch

- 说明：类似原生 `observers`，但支持深度相等比较和旧值参数。
- 可监听 `properties`、`data`、`computed`、`store`。

### pageLifetimes

- 说明：
  - 构建组件时：表示组件所在页面生命周期，并扩展 `load`（基础库 `>= 3.0.0`）。
  - 构建页面时：字段表现为页面生命周期方法。

## 原生兼容字段

- `lifetimes`（扩展 `beforeCreate`）
- `observers`
- `data`
- `methods`
- `export`
- `externalClasses`
- `options`
- `relations`
- `behaviors`

## 参考

- 源码目录：[src/api/RootComponent](https://github.com/missannil/annil/tree/main/src/api/RootComponent)
