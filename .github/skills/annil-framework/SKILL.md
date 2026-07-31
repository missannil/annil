---
name: annil-framework
description: "Use when implementing, reviewing, debugging, testing, or documenting Annil APIs and projects involving RootComponent, CustomComponent, ChunkComponent, DefineComponent, component documents, type inference, instanceConfig, typed navigation, or WXML contracts."
user-invocable: false
disable-model-invocation: false
---

# Annil Framework

## 先确定任务对象

- 本仓库任务：以 `src/index.ts`、目标源码、最近类型测试和 Jest 测试为事实源。
- 消费项目任务：先从 package、锁文件和实际解析位置确认所用 Annil 版本，再读取该版本的公开声明、源码和测试；不要套用本仓库最新行为。
- 文档用于解释，不能覆盖版本匹配的源码和测试。

公共契约或版本等级问题读取 [Contracts and Compatibility](../../../docs/maintainers/contracts-and-compatibility.md)。

## 按领域读取

- `RootComponent` 数据、事件和生命周期：[RootComponent](./references/root-component.md)
- 父子组件属性与事件契约：[CustomComponent](./references/custom-component.md)
- 普通 WXML 片段逻辑：[ChunkComponent](./references/chunk-component.md)
- 注册、组件文档、`typeEqual`、`DetailedType`：[DefineComponent 与类型](./references/define-and-typing.md)
- `instanceConfig`、导航、公共导出：[扩展能力](./references/extended-apis.md)
- `normalizeOptions`、生命周期顺序、computed/watch/store 协作：[运行时管线](./references/runtime-pipeline.md)
- 测试或 CI 配置：[Testing](../../../docs/maintainers/testing.md)
- 发布或发布失败：[Release](../../../docs/maintainers/release.md)

只读取当前任务涉及的条目。

## 工作方式

1. 读取目标公开声明、实现、直接类型依赖、最近测试和对应 API 文档。
2. 区分公共契约、内部实现和外部工具约定。
3. 用户要求修改时，进行最小修改并按影响范围验证；Review、调查或解释任务保持只读。

## Annil 特有约束

- `RootComponent`、`CustomComponent`、`ChunkComponent` 使用 `XxxComponent<...>()({...})`；`DefineComponent` 直接接收配置对象。
- 不向旧版本消费项目推荐该版本不存在的 API。
- 不把 Tailwind、固定目录、`isReady`、`hidden` 或 `componentPlaceholder` 声明为框架约束，除非目标项目另有规定。
