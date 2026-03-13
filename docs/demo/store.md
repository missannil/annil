# store

## 行为说明

1. `store` 基于 `mobx` 响应式数据，建议使用较新版本。
2. 当 `store` 数据变化时，Annil 会通过深度比较判断是否触发 `setData`。
3. 修改 `store` 应通过 `store` 内部方法进行。
4. 若数据变化不符合预期，应优先检查数据是否为响应式对象。
5. 组件实例建立前后的同步问题由内部机制处理，避免二次进入页面时状态不同步。

## 示例

```ts
import {
  CustomComponent,
  DefineComponent,
  type ExtendComponentType,
  RootComponent,
} from "annil";
import type { $TopNav } from "../../components/topNav/topNav";
import { userStore } from "../../moudule/userStore";

type $TopNavExtend = ExtendComponentType<
  $TopNav,
  { customEvents: { topNav_tap: null } }
>;

const rootComponent = RootComponent()({
  isPage: true,
  store: {
    userName: () => userStore.name,
  },
  watch: {
    userName(newVal, oldVal) {
      console.log("userName changed", newVal, oldVal);
    },
  },
  lifetimes: {
    attached() {
      userStore.changeName("zhang");
      userStore.changeAge(20);
    },
  },
});

type Root = typeof rootComponent;

const topNav = CustomComponent<Root, $TopNavExtend>()({
  data: {
    topNav_title: "store",
    topNav_twTitle: " primary",
  },
  events: {
    topNav_tap() {
      wx.navigateBack();
    },
  },
});

const profileStore = CustomComponent<
  Root,
  { properties: { profile_age: number } }
>()({
  store: {
    profile_age: () => userStore.age,
  },
  watch: {
    profile_age(newVal, oldVal) {
      console.log("profile_age changed", newVal, oldVal);
    },
  },
});

const store = DefineComponent({
  path: "/pages/store/store",
  rootComponent,
  subComponents: [topNav, profileStore],
});

export type $Store = typeof store;
```

## 参考

- 建议与 [API 总览](../api/overview.md) 配合阅读
