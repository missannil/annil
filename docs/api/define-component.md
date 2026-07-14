# DefineComponent

`DefineComponent` 是组件构建入口函数，通常与 `RootComponent`、`CustomComponent` 搭配使用。

## 示例 A：构建组件(CompA)

```ts
import { DefineComponent, RootComponent, typeEqual } from "annil";

const rootComponent = RootComponent()({
  isPage: false, // 或不写 isPage
  properties: {
    num: Number,
  },
  // ...
});
const compA = DefineComponent({
  name: "compA",
  rootComponent,
  subComponents: [], // 无子组件可省略
});
// 定义组件类型
export type $CompA = {
  name: "compA";
  properties: {
    num: number;
  };
};
// 验证组件类型
typeEqual<$CompA>()(compA);
```

## 示例 B：构建页面(IndexPage)

```ts
import {
  CustomComponent,
  DefineComponent,
  RootComponent,
  typeEqual,
} from "annil";
import type { $CompA } from "../components/compA";
const customA = CustomComponent<Root, $CompA>()({
  computed: {
    compA_num() {
      return this.data.num + 1;
    },
  },
});

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    num: {
      type: Number,
      value: 0,
    },
  },
  // ...
});
type Root = typeof rootComponent;

const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [customA],
});

export type $Index = {
  path: "/pages/index/index";
  properties: {
    num?: number;
  };
};

typeEqual<$Index>()(index);
```

## 字段说明

1. `rootComponent`

- 类型 [RootComponentDefinition](https://github.com/missannil/annil/blob/main/src/api/RootComponent/returnType.ts)

2. `path` / `name`

- 类型 [NameOrPathOption](https://github.com/missannil/annil/blob/main/src/api/DefineComponent/NameOrPath/NameOrPathOption.ts)
- 当 `rootComponent.isPage === true` 时，使用 `path`，类型为 `/${string}`。
- 当 `rootComponent.isPage` 不存在或为 `false` 时，使用 `name`，类型为非空且不包含下划线和空格的字符串。

3. `subComponents`

- 类型 [CustomComponentDefinition](https://github.com/missannil/annil/blob/main/src/api/CustomComponent/returnType.ts)[]

## 参考

- 源码导出：[src/index.ts](https://github.com/missannil/annil/blob/main/src/index.ts)
