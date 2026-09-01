# Annil

<p align="center">
  <a href="https://www.npmjs.com/package/annil">
    <img src="https://img.shields.io/npm/v/annil?style=flat" alt="npm version" />
  </a>
  <a href="https://github.com/missannil/annil/actions/workflows/test.yml">
    <img src="https://github.com/missannil/annil/actions/workflows/test.yml/badge.svg?branch=main" alt="test status" />
  </a>
  <a href="https://github.com/missannil/annil/actions/workflows/release-please.yml">
    <img src="https://github.com/missannil/annil/actions/workflows/release-please.yml/badge.svg?branch=main" alt="release status" />
  </a>
  <a href="https://github.com/missannil/annil/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/missannil/annil" alt="license" />
  </a>
  <a href="https://codecov.io/gh/missannil/annil">
    <img src="https://codecov.io/gh/missannil/annil/graph/badge.svg?token=4CFCHGST79" alt="coverage" />
  </a>
</p>

## 简介

Annil（安奈儿）是面向微信小程序原生开发的 TypeScript 框架，基于原生小程序能力提供一套更清晰、更易维护的开发范式。它补充了原生 API 的类型安全、组件构建、响应式数据和类型化导航能力，也让组件文件和 AI Agent 更容易维护。

## 快速开始

- [安装与配置](./docs/guide/getting-started.md)
- [API 总览](./docs/api/overview.md)

## 在线文档

- 在线文档：https://missannil.github.io/annil/
- 文档使用 VitePress 构建，并通过 GitHub Pages 部署。

## 特点

- **增强原生组件能力**

  在保留原生开发方式的基础上，提供 [computed](./docs/examples/computed.md)、[watch](./docs/examples/watch.md) 和 [store](./docs/examples/store.md)（基于 MobX 的全局响应式数据）等能力。

- **结构清晰的组件构建方式**

  通过根组件（`RootComponent`）和子组件（`CustomComponent` / `ChunkComponent`）拆分组件逻辑，使组件结构更清晰、更易维护。

- **极致的类型安全**

  `DefineComponent` 可以定义组件和页面，并通过组件文档类型配合 `typeEqual` 校验；`CustomComponent` / `ChunkComponent` 会提供属性、事件和页面路径的类型提示与检查，同时支持 `hry-types@0.20.3` 及兼容版本。

- **轻量、无侵入**

  Annil 基于原生 API，不强制改变项目结构，适合在新项目和现有小程序项目中渐进式引入。

- **补充原生类型与组件文件检查**

  Annil 补充微信小程序官方类型，通过 ES 模块导出，不污染全局类型，并配合 `vscode-annil` 检查组件的 WXML、JSON 和 TypeScript 文件。

- **第三方组件类型支持**

  可以使用 `CreateComponentDoc` 根据组件文档定义第三方组件类型。Annil 也导出了原生组件类型 `Wm` 和 Vant 组件类型 `Vant`。

- **AI Agent 适配**

  Annil 提供项目级的 instructions、skills 等配置，减少重复知识，让 AI Agent 更容易理解和维护小程序项目。

- **VS Code 插件 `vscode-annil`**

  在插件市场搜索 `annil` 并安装，可获得代码补全、类型检查、组件模板生成以及 WXML 和 JSON 检查等辅助能力。

## 更新日志

[CHANGELOG](./CHANGELOG.md)
