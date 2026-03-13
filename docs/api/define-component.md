# DefineComponent

`DefineComponent` 是组件构建入口函数，通常与 `RootComponent`、`CustomComponent` / `ChunkComponent` 搭配使用。

## 示例 A：构建页面

```ts
import { CustomComponent, DefineComponent, RootComponent } from "annil";

const customA = CustomComponent<Root, $CompA>()({
  // ...
});
const customB = CustomComponent<Root, $CompB>()({
  // ...
});
const rootComponent = RootComponent()({
  isPage: true,
  // ...
});
type Root = typeof rootComponent;

DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [customA, customB],
});
```

## 示例 B：构建组件

```ts
import { ChunkComponent, DefineComponent, RootComponent } from "annil";

const chunkA = ChunkComponent<Root, "list">()({
  // ...
});
const chunkB = ChunkComponent<Root, "card">()({
  // ...
});
const rootComponent = RootComponent()({
  // 不写 isPage 或 isPage: false
});
type Root = typeof rootComponent;

DefineComponent({
  name: "compA",
  rootComponent,
  subComponents: [chunkA, chunkB],
});
```

## 字段说明

1. `rootComponent`

- 类型为 `RootComponent` 的返回类型。

2. `subComponents`

- 类型为 `CustomComponent` / `ChunkComponent` 返回类型的数组。

3. `path` / `name`（JS 可忽略类型约束）

- 当 `rootComponent.isPage === true` 时，使用 `path`，类型为 `/${string}`。
- 当 `rootComponent.isPage` 不存在或为 `false` 时，使用 `name`，类型为非空字符串。

## 参考

- 源码导出：[src/index.ts](https://github.com/missannil/annil/blob/main/src/index.ts)
