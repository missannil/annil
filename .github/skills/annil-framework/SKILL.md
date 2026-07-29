---
name: annil-framework
description: "Use when implementing, reviewing, debugging, testing, or documenting Annil framework source and projects using RootComponent, CustomComponent, ChunkComponent, DefineComponent, typeEqual, DetailedType, instanceConfig, typed navigation, component documents, or WXML contracts."
user-invocable: true
disable-model-invocation: false
---

# Annil Framework

## 事实来源

处理消费项目时，按以下顺序确认行为：

1. 读取消费项目实际安装或链接的 `annil` 版本。
2. 优先使用该版本的公开类型声明、源码和测试。
3. 本仓库源码仅在版本匹配或任务直接修改本仓库时作为事实源。
4. 文档用于解释，不得覆盖版本匹配的源码与测试。

版本选择细则见 [版本策略](./references/version-policy.md)。

## 按任务读取

- `RootComponent` 数据、事件、生命周期：读取 [RootComponent](./references/root-component.md)。
- 父子组件属性与事件契约：读取 [CustomComponent](./references/custom-component.md)。
- 普通 WXML 片段的局部逻辑：读取 [ChunkComponent](./references/chunk-component.md)。
- 注册、组件文档、`typeEqual`、`DetailedType`：读取 [DefineComponent 与类型](./references/define-and-typing.md)。
- `instanceConfig`、导航或公共导出：读取 [扩展能力](./references/extended-apis.md)。
- 定位实现、文档和测试：读取 [源码索引](./references/source-map.md)。

只读取当前任务需要的 reference。

## 工作流程

1. 判断任务对象是 Annil 源码还是消费项目。
2. 确认有效版本和依赖解析位置。
3. 读取目标 API 的公开声明、实现、最近测试和对应文档。
4. 区分框架契约与项目约定。
5. 进行满足需求的最小修改，并使用仓库现有命令验证。

## 约束

- `RootComponent`、`CustomComponent`、`ChunkComponent` 均使用 `XxxComponent<...>()({...})` 二次调用形式。
- 不把目录布局、固定文件数、Tailwind、`isReady`、`hidden` 或 `componentPlaceholder` 声明为框架硬约束，除非目标项目另有规定。
- 不把其他版本新增的 API 推荐给旧版本消费项目。
- 不复制整份源码或文档到对话；优先引用目标声明和最小示例。
- 源码、类型声明与文档不一致时，报告版本，并以版本匹配的源码和测试为准。
