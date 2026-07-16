# 安装与配置

## 安装

```bash
npm i annil
```

可选依赖（TypeScript开发）:

```bash
npm --save-dev typescript miniprogram-api-typings
```

使用 `store` 能力时：

```bash
npm i mobx
```

## 构建 npm

在微信开发者工具中执行：工具 → 构建 npm。

> 若使用mobx@6^,在构建npm前需要手动更改`node_modules/mobx/dist/index.js`文件
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

## VS Code 插件

插件市场安装 搜索 `annil` 安装即可

## tsconfig 推荐配置

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "moduleResolution": "nodenext",
    "module": "nodenext",
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
