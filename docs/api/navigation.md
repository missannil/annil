# 导航 API

Annil 提供 `navigateTo`、`navigateBack` 与 `redirectTo` 三个导航 API。在原生微信小程序导航能力的基础上，它们提供页面路径与参数的类型检查，以及结构化数据传递能力。

## navigateTo

`navigateTo` 是对原生 `wx.navigateTo` 的增强版本，适合搭配 `DefineComponent` 定义的页面使用：

- `url` 受目标页面文档的 `path` 类型约束
- 目标页面存在必填 `properties` 时，`data` 必填且必须与其匹配
- `data` 会被序列化并编码，目标页面的 `onLoad` 可直接获得已还原的结构化参数
- 支持数据中的特殊字符，例如 `:/?#[]@!$&'()*+,;=`

### 页面定义示例

```ts
import {
  DefineComponent,
  type DetailedType,
  RootComponent,
  typeEqual,
} from "annil";

export type User = {
  name: string;
  age?: number;
};

const rootComponent = RootComponent()({
  isPage: true,
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

export type $Demo = {
  path: "/pages/demo/demo";
  properties: {
    user: User;
    character: string;
  };
};

typeEqual<$Demo>()(demo);
```

### 跳转示例

```ts
import { navigateTo } from "annil";
import type { $Demo } from "path/to/demo";

void navigateTo<$Demo>({
  url: "/pages/demo/demo",
  data: {
    user: {
      name: "annil",
      age: 23,
    },
    character: `:/?#[]@!$&'()*+,;=`,
  },
});
```

::: tip
通过 `navigateTo` 传递的数据由 Annil 注入到页面的 `onLoad` 参数中，无需再手动解析 URL 查询字符串。
:::

::: warning 传入对象会被修改
当提供 `data` 时，`navigateTo` 和 `redirectTo` 会在内部读取后删除传入对象的 `url` 与 `data` 字段。请传入临时对象，或不要在调用后复用该对象。
:::

## navigateBack

`navigateBack` 支持在返回上个页面时携带 `data`，并与 `navigateTo` 的回调配合。回调参数当前为 `unknown`，使用时应自行收窄类型。

```ts
import { navigateBack, navigateTo } from "annil";

void navigateTo<$DetailPage>({
  url: "/pages/detail/detail",
  data: { id: 1 },
}, (data) => {
  const result = data as { changed: boolean };
  console.log("back data", result.changed);
});

navigateBack<{ changed: boolean }>({
  delta: 1,
  data: { changed: true },
});
```

::: warning 使用回调时必须返回数据
如果对应的 `navigateTo` 传入了第二个参数回调函数，调用 `navigateBack` 时必须传入包含 `data` 的配置对象，否则会抛出运行时错误。使用回调传值时请保持 `delta: 1`；当前回调栈只会处理最近一次跳转。
:::

## redirectTo

`redirectTo` 与 `navigateTo` 一样支持目标页面类型检查、`data` 字段和特殊字符编码能力，但会关闭当前页面，且不支持返回回调。

```ts
import { redirectTo } from "annil";

void redirectTo<$TargetPage>({
  url: "/pages/target/target",
  data: {
    query: ":/?#[]@!$&'()*+,;=",
  },
});
```

## 使用限制

- 回传数据和回调由 `navigateTo` / `navigateBack` 的内存栈维护。若通过系统返回键或其他原生导航方式返回，无法携带该回传数据。
- 需要回传数据时，使用本 API 提供的 `navigateBack`，不要直接调用 `wx.navigateBack`。

## 参考

- 源码入口：[src/api/wxSugar.ts](https://github.com/missannil/annil/blob/main/src/api/wxSugar.ts)
