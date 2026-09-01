---
name: annil-framework
description: "Use when implementing, reviewing, debugging, testing, or documenting Annil APIs and projects involving RootComponent, CustomComponent, ChunkComponent, DefineComponent, component documents, type inference, instanceConfig, typed navigation, or WXML contracts."
user-invocable: false
disable-model-invocation: false
---

# Annil Framework

本技能用于定位证据，不复制框架知识。先确认任务对象；消费项目必须使用实际安装的 Annil
版本，不套用本仓库最新行为。

1. 读取 `src/index.ts`、目标实现、直接类型依赖和最近测试。
2. 读取匹配的 `docs/api/<api>.md` 理解公共语义；架构、兼容、测试或发布任务分别读取
   `docs/maintainers/architecture.md`、`contracts-and-compatibility.md`、`testing.md`、`release.md`。
3. 涉及 `vscode-annil`、WXML、组件文档、前缀或调用 AST 时，单独核对外部工具协议。

文档与源码或测试冲突时记录冲突，以版本匹配的源码和测试为准。修改任务按影响范围最小化并
验证；Review、调查和解释任务保持只读。不要把消费项目的业务约定写成框架规则。
