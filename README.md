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

annil(安奈儿)是微信小程序原生开发插件。

### 特点

- **新的组件构建API**

  新的组件构建API加入了[computed](./doc/fields/computed.md)、[watch](./doc/fields/watch.md)、[store](./doc/fields/store.md)(基于mobx的全局响应式数据)`等功能,使开发更便捷。

- **复杂组件解决方案**

  新的组件构建方案(根组件 + 子组件(可选)),组件逻辑与wxml元素(标签)一一对应。解决书写复杂组件时代码逻辑耦合的问题。

- **组件类型概念**

  在使用ts开发时,新的组件构建API返回的类型叫组件文档类型,好比传统组件(UI)库为每个组件书写的使用文档,在做为子组件构建新组件(页面)时,子组件API要求使用者输入组件类型,让使用者知道该定义哪些字段(类型提示)并确保字段值类型正确(类型约束和检测)。这样实现了一个页面中所有子组件之间的类型耦合,无论组件嵌套多少层,无论哪层组件数据类型发生改变,所有相关组件类型都会得到感知。当您修改、重构代码时,只要无类型报错(tsc --noEmit --watch)就不会有运行时报错的心智负担。

- **类型约束代码规范**

  js开发时可以任意`setData`一个未声明变量或通过`this.triggerEvent('name',unknown)`触发组件自定义事件。这是js的特点,但易读性和易维护性差。(ts开发时)新API通过类型报错形式对[代码规范](./doc/standard.md)给了强制约束

- **高兼容性**

  annil提供的API都是原生API的语法糖,不具有强制性和侵入性,开发者可在整个项目中使用,也可只在某处使用。

- **类型修补**

  官方类型(miniprogram-api-typings)存在更新不及时等问题,annil提供了新的类型方便ts开发,同时会对官方类型库发起PR。
  这些类型都采用ES模块化,不会污染全局类型。

- **适配任何第三方库**

  通过插件提供的泛型[GenerateDoc](./src/types/GenerateDoc.ts)即可根据组件文档生成组件类型,插件也内置了原生和第三方组件库类型。

### 安装

1. 依赖安装

- 必装

  ```bash
  npm i annil
  ```

- 可选

  ```bash
  npm typescript --save-dev
  ```

  ```bash
  # 使用全局状态管理
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
     module.exports = require("./mobx.cjs.production.min.js"); // 仅保留这行即可
   } else {
     module.exports = require("./mobx.cjs.development.js");
   }
   ```
   ```js
   // 更改后
   "use strict";
   module.exports = require("./mobx.cjs.production.min.js");
   ```

3. 配置tsconfig.json(使用ts开发时)
   ```json
   {
     "compilerOptions": {
       // ...
       "lib": ["ES2022"],
       "skipLibCheck": true,
       "strict": true,
       "strictFunctionTypes": false, // 解决给事件参数e重定义类型报错的问题
       "types": ["miniprogram-api-typings"]
     }
     // ...
   }
   ```

### 使用文档

1. 组件构建API

   [DefineComponent](./doc/api/DefineComponent.md)

   [RootComopnent](./doc/api/RootComopnent.md)

   [SubComponent](./doc/api/SubComponent.md)

### 更新日志

[CHANGELOG](./CHANGELOG.md)

### 协议

[MIT](./LICENSE)
