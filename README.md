<h1 align="center">Annil</h1>

<p align="center">
<a href="https://www.npmjs.com/package/annil" >
 <img src="https://img.shields.io/npm/v/annil?style=flat"/>
</a>
<a href="https://github.com/missannil/annil/blob/main/.github/workflows/test.yml" >
 <img src="https://github.com/missannil/annil/actions/workflows/test.yml/badge.svg?branch=miss"/>
 </a>
<a href="https://github.com/missannil/annil/blob/main/.github/workflows/release-please.yml" >
 <img src="https://github.com/missannil/annil/actions/workflows/release-please.yml/badge.svg?branch=main"/>
 </a>
<a href="https://github.com/missannil/annil/blob/main/LICENSE" >
 <img src="https://img.shields.io/github/license/missannil/annil"/>
 </a>
<a href="https://codecov.io/gh/missannil/annil" >
 <img src="https://codecov.io/gh/missannil/annil/graph/badge.svg?token=4CFCHGST79"/>
 </a>
<a href="https://www.npmjs.com/package/annil" >
<img src="https://img.shields.io/npm/dependency-version/annil/dev/typescript"/>
</a>
</p>

### 简介

annil(安奈儿)是微信小程序原生开发插件,提供了新的组件构建API,旨在提高原生开发效率及代码质量。

### 特点

- **API功能更全面 **

  新的组件API(相较原生Component/Page)加入了`computed`、`watch`、`store(全局响应式数据基于mobx)`等功能,使开发更便捷。[示例](./doc/demo/firstMeeting.md)

- **复杂组件解决方案**

  新的组件API把组件逻辑部分解耦为根组件逻辑和子组件逻辑,与wxml元素一一对应。彻底解决原生API书写复杂组件时代码逻辑耦合的问题。

- **革命性的组件类型模型**

  每个组件(页面)都是唯一的类型(文档描述->类型描述),在使用子组件构建新组件(页面)时,根组件和子组件类型相互关联(提供字段提示、类型约束),无论组件(页面)嵌套多少层,无论哪层数据类型发生改变,所有相关组件类型都会得到感知。当您修改、重构代码时,只要无类型报错就不会有运行时报错的心智负担。

- **更合理的书写规范**

  原生开发时,很容易写出不易维护的代码,比如任意`setData`一个未声明变量或通过`this.triggerEvent('name',unknown)`触发组件自定义事件。插件通过类型约束和提前声明变量等方式给出了可选方案。

- **渐进式更新**

  此插件提供的API都是原生API的语法糖,不具有强制性和全局性,来去自如。

- **完美融合第三方库**

  通过插件提供的泛型[GenerateDoc](./src/types/GenerateDoc.ts)即可根据组件文档生成组件类型,插件也内置了一些原生和第三方组件库类型,欢迎PR您写的第三方组件类型,我为人人，人人为我。

### 安装

1. 依赖安装

- 必装

  ```bash
  npm i annil
  ```

- 可选

  ```bash
  # 推荐使用 ts开发
  npm typescript  --save-dev
  ```

  ```bash
  # 使用全局响应式数据
  npm i mobx
  ```

2. 构建npm

   开发者工具左上部工具栏——工具——构建npm
   > 若使用mobx,在构建npm前需要手动更改`node_modules/mobx/dist/index.js`文件
   > 避免使用时出现 `ReferenceError: process is not defined` 错误。
   ```js
   // 更改前
   "use strict";

   if (process.env.NODE_ENV === "production") {
     module.exports = require("./mobx.cjs.production.min.js");
   } else {
     module.exports = require("./mobx.cjs.development.js");
   }
   ```
   ```js
   // 更改后
   "use strict";
   module.exports = require("./mobx.cjs.production.min.js");
   ```

   > 另外,构建时会出现`node_modules/miniprogram-api-typings/index.d.ts.js: Npm package entry file not found`错误,这是因为annil插件把官方类型库`miniprogram-api-typings`加入到生产依赖中,而npm构建时找不到生产目录所致,无视即可。还需删除`miniprogram_npm`下的`hry-types`目录(annil依赖的另一个类型库)。确保annil和mobx目录构建成功即可。

### 使用文档

### 更新日志

[CHANGELOG](./CHANGELOG.md)

### 协议

[MIT](./LICENSE)
