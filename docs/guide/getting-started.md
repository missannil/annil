# 安装与配置

## 安装

```bash
npm i annil
```

可选依赖（TypeScript 开发推荐）：

```bash
npm --save-dev typescript hry-types miniprogram-api-typings
```

使用 `store` 能力时：

```bash
npm i mobx
```

## 构建 npm

在微信开发者工具中执行：工具 → 构建 npm。

> 若使用 mobx 6.x，构建前请按 README 说明处理 `node_modules/mobx/dist/index.js`，避免 `process is not defined` 错误。

## VS Code 插件（推荐）

推荐安装 `vscode-annil`，用于提升开发效率与代码一致性，尤其在与 AI 协作生成代码时更易得到正确字段与结构。

- 插件市场：[vscode-annil](https://marketplace.visualstudio.com/items?itemName=missannil.vscode-annil)
- 项目地址：[missannil/vscode-annil](https://github.com/missannil/vscode-annil)

## tsconfig 推荐配置

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noEmit": true,
    "strictFunctionTypes": false,
    "types": ["hry-types", "mobx", "miniprogram-api-typings"]
  },
  "include": ["**/*.ts"]
}
```
