# ChunkComponent

`ChunkComponent<RootDoc, Prefix>()({...})` 为当前组件 WXML 中的普通元素片段组织局部数据和逻辑，不创建新的微信自定义组件实例。

## 稳定语义

- Chunk 配置通过 `DefineComponent.subComponents` 与 Root 和其他配置合并。
- `Prefix` 启用后，`data`、`store`、`computed`、`events`、`methods` 受前缀约束。
- Chunk 可以读取 Root 数据和方法，但不能与宿主或其他 Chunk 产生同名字段冲突。
- Chunk 不生成可供外部消费的组件文档，也不需要 `usingComponents`。

## 工具链约定

框架运行时不读取 WXML `id`。当前官方文档和 `vscode-annil` 约定以下三者一致，以便插件识别作用域：

1. 接收 `ChunkComponent` 返回值的 TS 变量名；
2. `ChunkComponent` 的 `Prefix`；
3. 对应原生 WXML 根节点的静态 `id`。

修改框架核心时应区分运行时契约和插件约定；修改消费项目时建议遵守三者一致。

## 修改或排错

同时读取：

- [实现](../../../../src/api/ChunkComponent/index.ts)
- [文档](../../../../docs/api/chunk-component.md)
- [测试目录](../../../../jest/chunkComponents)
