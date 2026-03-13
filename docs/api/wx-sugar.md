# wxSugar

`wxSugar` 提供对微信小程序原生 API 的语法糖封装。

## navigateTo

`navigateTo` 是对原生 `wx.navigateTo` 的增强版本，适合搭配组件构建 API 使用：

- 可在 `onLoad/load` 生命周期中直接获取结构化参数
- 支持特殊字符 `:/?#[]@!$&'()*+,;=`

### 页面定义示例

```ts
// pages/demo/demo.ts
export type User = {
  name: string;
  age?: number;
};

const rootComponent = RootComponent()({
  properties: {
    user: Object as DetailedType<User>,
    character: String,
  },
  pageLifetimes: {
    onLoad(params) {
      console.log(params.user);
      console.log(params.character);
    },
  },
});

const demo = DefineComponent({
  path: "/pages/demo/demo",
  rootComponent,
});

export type $Demo = typeof demo;
```

### 跳转示例

```ts
// pages/index/index.ts
import { navigateTo } from "annil";
import type { $Demo } from "path/to/demo";

Page({
  data: {
    user: {
      name: "annil",
      age: 23,
    },
  },
  onLoad() {
    navigateTo<$Demo>({
      url: "/pages/demo/demo",
      data: {
        user: this.data.user,
        character: `:/?#[]@!$&'()*+,;=`,
      },
    });
  },
});
```

::: tip
从基础库 `3.0.0` 起，组件 `pageLifetimes` 提供 `load` 生命周期；通过 `navigateTo` 传值时，`load` 与页面 `onLoad` 可获得一致参数。
:::

## navigateBack

`navigateBack` 支持在返回上个页面时携带 `data`，并与 `navigateTo` 的回调配合。

```ts
import { navigateBack, navigateTo } from "annil";

navigateTo<$DetailPage>({
  url: "/pages/detail/detail",
  data: { id: 1 },
}, (res) => {
  console.log("back data", res);
});

navigateBack({
  delta: 1,
  data: { changed: true },
});
```

## redirectTo

`redirectTo` 与 `navigateTo` 一样支持 `data` 字段与特殊字符编码能力，但会关闭当前页面。

```ts
import { redirectTo } from "annil";

redirectTo<$TargetPage>({
  url: "/pages/target/target",
  data: {
    query: ":/?#[]@!$&'()*+,;=",
  },
});
```

## 参考

- 源码入口：[src/api/wxSugar.ts](https://github.com/missannil/annil/blob/main/src/api/wxSugar.ts)
