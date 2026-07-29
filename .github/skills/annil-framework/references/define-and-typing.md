# DefineComponent 与类型

## DefineComponent

- `DefineComponent` 将 `rootComponent` 和 `subComponents` 归一化后交给微信原生 `Component`。
- 组件使用 `name`，页面使用 `path`；选择由 Root 的 `isPage` 决定。
- 组件返回 `ComponentDoc`，页面返回 `PageDoc`。
- `subComponents` 可包含 `CustomComponent` 和 `ChunkComponent` 的定义。

## 组件文档

- 推荐手动导出清晰的 `$Name` 文档类型，而不是导出深层 `typeof component`。
- 组件文档的 `properties` 和 `events` 使用组件名前缀。
- 页面文档包含 `path`，页面属性不使用组件名前缀。
- 使用 `typeEqual<$Name>()(component)` 校验手写文档与实际返回类型完全相等。

## DetailedType

原生构造器无法表达复杂类型时，使用 `Object as DetailedType<T>`、`Array as DetailedType<T[]>` 等形式；它只提供类型信息。

## 修改或排错

同时读取：

- [DefineComponent 实现](../../../../src/api/DefineComponent/index.ts)
- [归一化实现](../../../../src/api/DefineComponent/normalizeOptions)
- [DefineComponent 文档](../../../../docs/api/define-component.md)
- [DetailedType](../../../../src/types/DetailedType.ts)
- [typeEqual](../../../../src/utils/typeEqual.ts)
