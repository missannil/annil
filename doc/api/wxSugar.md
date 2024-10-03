### navigateTo

> 原生wx.navigateTo的语法糖,搭配组件构建API使用,在onLoad(load)生命周期中可直接获取值并支持特殊字符`:/?#[]@!$&'()*+,;=`

示例

```ts
// pages/demo/demo.ts

export type User = {
  name: string;
  age?: number;
};
const rootComponent = RootComonent()({
  properties: {
    user: Object as DetailedType<User>,
    character: String,
  },
  pageLifetimes: {
    onLoad(params) {
      console.log(params.user); //  { name:"annil",age: 23 }
      console.log(params.character); //  ":/?#[]@!$&'()*+,;="
    },
  },
});

const demo = DefineComonent({
  path: "pages/demo/demo",
  rootComponent,
});
export type $Demo = typeof demo;

// type $Demo = {
//   path: "pages/demo/demo";
//   properties: {
//     user: User;
//     character:string
//   };
// };
```

```ts
// pages/index/index.ts
import { navigateTo } from "annil";
import type { $Demo, User } from "path/to/demo";
Page({
  data: {
    user: {
      name: "annil",
      age: 23,
    },
  },
  onLoad() {
    navigateTo<$Demo>({
      url: "pages/demo/demo",
      data: {
        user: this.data.user,
        character: ":/?#[]@!$&'()*+,;=",
      },
      // ...
    });
  },
});
```

> 从基础库3.0.0起, 组件的pageLifetimes选项中加入了load生命周期,当使用navigateTo传值时,load参数得到的值与页面onLoad周期得到的参数相同。
