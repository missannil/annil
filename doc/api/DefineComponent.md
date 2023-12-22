### DefineComponent 接口

DefineComponent 是组件构建API其中之一,搭配 [RootComponent](./RootComponent.md) 和 [SubComponent](./SubComponent.md)使用

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
  path: "/pages/index/index",
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
  // 无isPage字段 或 isPage:false
});

DefineComponent({
  name: "demo",
  rootComponent,
  subComponents: [SubComponentA, SubComponentB],
});
```

RootComponent有3个字段

1. rootComponent字段即 RootComponent接口返回的对象([RootComponentDoc](../../src\api\RootComponent\RootComponentDoc.ts)类型)

2. subComponents字段为数组,item是SubComponent接口返回的对象([SubComponentDoc](../../src\api\SubComponent\SubComponentDoc.ts)类型)

3. path或name字段

   当rootComponent字段的isPage为true时(页面),字段为path,类型为`/${string}`
   当rootComponent字段的isPage不存在或为false时(组件),字段为name,类型为非空字符串
   ts开发时有类型提示(检测),js开发时有运行时检测。
