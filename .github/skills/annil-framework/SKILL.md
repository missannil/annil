---
name: annil-framework
description: "Use when implementing, reviewing, debugging, testing, or documenting Annil APIs and projects involving RootComponent, CustomComponent, ChunkComponent, DefineComponent, component documents, type inference, instanceConfig, typed navigation, or WXML contracts."
user-invocable: false
disable-model-invocation: false
---

# Annil Framework

## 任务路由

本技能只负责定位证据，不复制 Annil 框架知识。公共 API 和稳定语义以 `docs/` 为
唯一解释来源；实际行为仍以版本匹配的源码和测试为准。

- RootComponent：[API 文档](../../../docs/api/root-component.md)
- CustomComponent：[API 文档](../../../docs/api/custom-component.md)
- ChunkComponent：[API 文档](../../../docs/api/chunk-component.md)
- DefineComponent、组件文档和类型：[API 文档](../../../docs/api/define-component.md)
- instanceConfig：[API 文档](../../../docs/api/instance-config.md)
- 类型化导航：[API 文档](../../../docs/api/navigation.md)
- API 导航：[API 总览](../../../docs/api/overview.md)
- 架构与运行时不变量：[Architecture](../../../docs/maintainers/architecture.md)
- 公共契约、SemVer 和外部工具协议：[Contracts and Compatibility](../../../docs/maintainers/contracts-and-compatibility.md)
- 测试与验证：[Testing](../../../docs/maintainers/testing.md)
- 发布与发布失败：[Release](../../../docs/maintainers/release.md)

只读取当前任务涉及的文档。文档若与源码或测试冲突，记录冲突并以版本匹配的源码和
测试为准；不要把未验证的文档内容继续传播到其他定制文件。

## 证据顺序

1. 确认任务对象和实际 Annil 版本；消费项目不得套用本仓库最新行为。
2. 读取 `src/index.ts`、目标实现、直接类型依赖和最近测试。
3. 读取对应 `docs/api` 或 `docs/maintainers` 文档，用于理解公共语义和验证范围。
4. 涉及 `vscode-annil` 或其他工具时，单独检查外部工具协议，不把它当成运行时行为。

修改任务按影响范围做最小修改并验证；Review、调查和解释任务保持只读。

## 工作边界

- 公共 API、调用形状和公共出口判断：读取 [API 总览](../../../docs/api/overview.md) 和 [Contracts and Compatibility](../../../docs/maintainers/contracts-and-compatibility.md)。
- 消费项目任务先确认实际安装版本；不向旧版本推荐目标版本不存在的 API。
- 不把消费项目的目录、样式或业务字段约定声明为 Annil 框架规则，除非目标项目另有规定。
