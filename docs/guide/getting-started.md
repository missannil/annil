# 安装与配置

## 安装

```bash
npm install annil
```

typeScript 开发时：

```bash
npm --save-dev typescript@^7.0.2 miniprogram-api-typings@^5.2.1
```

使用 `store` 能力时：

```bash
npm install mobx@^6.9.0
```

## 构建 npm

在微信开发者工具中执行：工具 → 构建 npm。

::: tip
使用 mobx 时,为避免报错 ——`process is not defined`, 需要在npm打包前修改 `node_modules/mobx/dist/index.js`中的内容：

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

:::

## VS Code 插件

插件市场安装 搜索 `annil` 安装即可

## tsconfig 推荐配置

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "es2022",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "strictFunctionTypes": false,
    "types": [
      "mobx",
      "miniprogram-api-typings"
    ]
  },
  "include": ["**/*.ts"]
}
```
