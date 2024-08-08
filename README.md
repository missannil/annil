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

annil(安奈儿)是微信小程序原生开发插件。她会让你获得新的开发体验,提高代码质量和开发效率。

### 特点

- **组件构建API功能更强大**

  新的组件构建API加入了[computed](./doc/demo/computed.md)、[watch](./doc/demo/watch.md)、[store](./doc/demo/store.md)(基于mobx的全局响应式数据)`等功能,使开发更便捷。

- **复杂组件解决方案**

  新的组件构建方案(根组件 + 子组件(可选)),组件逻辑与wxml标签一一对应。解决书写复杂组件时不同组件代码耦合的问题。

- **组件类型概念**

  新的组件构建API(DefineComponent)返回的类型叫组件类型,好比传统组件(UI)库为每个组件书写的使用文档,在做为子组件构建新组件(页面)时,子组件API(SubComponent)需要使用者传入组件类型,这样在书写配置字段时会得到完美的类型提示和检测。这样实现了一个页面中所有子组件之间的类型耦合,无论组件嵌套多少层,无论哪层组件数据类型发生改变,所有相关组件类型都会得到感知。当您增改、重构代码时,只要无类型报错(tsc --noEmit --watch)就不会有运行时报错的心智负担。

- **高兼容性**

  annil提供的API都是原生API的语法糖,不具有强制性和侵入性,可渐进的重构代码。

- **类型修补**

  官方类型(miniprogram-api-typings)更新可能不够及时,annil提供了新的类型(补全官方类型)方便开发,这些类型都采用ES模块化,不会污染全局类型。

- **完美适配第三方组件(UI)库**

  第三方组件库一般都是以文档的形式对组件说明,annil提供了泛型[CreateComponentType](./src/types/CreateComponentType.ts),可根据组件文档快速书写组件类型,使第三方组件完美融入annil组件模型,也可以自己书写临时组件类型用于项目。内置的原生组件类型库(Wm)和第三方组件库(Vant)也会持续维护。

- **vscode插件 `annil`**

  当使用ts开发时,可安装vscode插件,会自动检测组件中`.wxml` 和 `.json`错误,并可一键修复。详情见 [插件市场](https://marketplace.visualstudio.com/items?itemName=missannil.vscode-annil)

### 安装

1. 依赖安装

- 必装

  ```bash
  npm i annil
  ```

- 可选

  ```bash
  # 使用ts开发 hry-types为annil依赖的类型库
  npm  --save-dev typescript hry-types miniprogram-api-typings
  ```

  ```bash
  # 使用全局状态管理 当前为mobx6版本
  npm i mobx
  ```

2. 构建npm

   > 若使用mobx(当前mobx为6.x.x),在构建npm前需要手动更改`node_modules/mobx/dist/index.js`文件
   > 避免构建时出现 `ReferenceError: process is not defined` 错误。
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

   开发者工具左上部工具栏——工具——构建npm
3. 配置tsconfig.json(使用ts开发时)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "moduleResolution": "node",
    "skipLibCheck": true, // 跳过声明文件的类型检查(.d.ts)。
    "esModuleInterop": true, // 默认false. 兼容非ES模块引用的写法(如 import type mobx from 'mobx'等).
    "strict": true, // 启用严格模式
    "noEmit": true, // 编译时不生成文件。
    "strictFunctionTypes": false, // 忽略函数参数逆变引起的问题
    "types": [
      "hry-types",
      "mobx",
      "miniprogram-api-typings"
    ]
  },
  "include": [
    "**/*.ts"
  ]
}
```

### 使用文档

- **组件构建API**

  [DefineComponent](./doc/api/DefineComponent.md)

  [RootComponent](./doc/api/RootComponent.md)

  [SubComponent](./doc/api/SubComponent.md)

- **常用API**

  [navigateTo](./doc/api/navigateTo.md)

- 实用泛型

  [CreateComponentType](./src/types/CreateComponentType.ts)

  [ExtendComponentType](./src/types/ExtendComponentType.ts)

### 更新日志

[CHANGELOG](./CHANGELOG.md)
