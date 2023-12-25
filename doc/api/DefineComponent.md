### DefineComponent

> DefineComponent 是组件构建函数之一,搭配 [RootComponent](./RootComponent.md) 和 [SubComponent](./SubComponent.md)使用

示例 A (DefineComponent 建立页面时)

```ts
import { DefineComponent, RootComponent, SubComponent } from "annil";

const SubComponentA = SubComponent()({
  // ...
});
const SubComponentB = SubComponent()({
  // ...
});
const rootComponent = RootComponent()({
  isPage: true,
  // ...
});

DefineComponent({
  path: "/pages/index/index", // 构建页面时为 `path` 字段 js可忽略
  rootComponent,
  subComponents: [SubComponentA, SubComponentB],
});
```

示例 B (DefineComponent 建立组件时)

```ts
import { DefineComponent, RootComponent, SubComponent } from "annil";

const SubComponentA = SubComponent()({
  // ...
});
const SubComponentB = SubComponent()({
  // ...
});
const rootComponent = RootComponent()({
  // 不写isPage字段 或 isPage:false
});

DefineComponent({
  name: "compA", // 构建组件时为 `name`字段   js可忽略
  rootComponent,
  subComponents: [SubComponentA, SubComponentB],
});
```

**字段说明**

1. rootComponent字段类型为([RootComponentDoc](../../src\api\RootComponent\RootComponentDoc.ts)),即RootComponent接口返回类型

2. subComponents字段类型为([SubComponentDoc](../../src\api\SubComponent\SubComponentDoc.ts)[ ]),即SubComponent接口返回的类型数组

3. path或name字段(js开发可忽略)

   当rootComponent字段的isPage为true时(页面),字段为path,类型为`/${string}`
   当rootComponent字段的isPage不存在或为false时(组件),字段为name,类型为非空字符串
   ts开发时有类型提示(检测).
