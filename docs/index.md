---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Annil'
  text: '微信小程序原生开发插件'
  tagline: 增强原生开发体验,让小程序拥有"大"能力。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: API 总览
      link: /api/overview

features:
  - title: 新的组件构建方式
    details: 根组件 + 子组件 的构建方式 让组件更易管理。
  - title: 提高原生开发能力
    details: 组件构建API支持 computed、watch、store 等能力,修补和拓展原生类型系统(miniprogram-api-typings)
  - title: 极致的类型安全
    details: typescript类型系统的"变态级"应用。
  - title: 轻量无侵入
    details: 本质上Annil提供的API都是原生API的语法糖,无论新老项目,都可以渐进式使用Annil。
  - title: 框架能力
    details: 插件(vscode-annil)、组件库(annil-ui),测试插件(annil-test)等生态建设中。
---

## 文档说明

当前文档已基于 VitePress 搭建，结构分为：

- 指南：概念、安装、设计理念
- API：核心接口、实例注入与导航能力
- 示例：computed、watch、store

你可以从左侧导航直接进入对应章节。
