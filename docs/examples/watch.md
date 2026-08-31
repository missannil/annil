# watch

## 行为说明

1. 可监听 `properties`、`store`、`data`、`computed`，子组件也可监听根组件数据。
2. 只有数据真实变化（深度比较）时才触发回调。
3. 支持子属性监听（如 `Duser.age`），但 TS 场景不建议超过一级子属性监听。
4. 监听计算属性时，建议手动标注参数类型。
5. 在 `watch` 中调用 `setData` 时应避免循环触发。

## 示例

```ts
import {
  CustomComponent,
  DefineComponent,
  type DetailedType,
  type ExtendComponentType,
  RootComponent,
} from "annil";
import type { $TopNav } from "../../components/topNav/topNav";
import { User, userStore } from "../../moudule/userStore";

type $TopNavExtend = ExtendComponentType<
  $TopNav,
  { events: { topNav_tap: null } }
>;

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    user: Object as DetailedType<User>,
  },
  data: {
    Duser: { name: "zhao", age: 20 },
  },
  store: {
    name: () => userStore.name,
  },
  computed: {
    age(): number {
      return this.data.user?.age || 0;
    },
  },
  watch: {
    user(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
    "Duser.age"(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
    age(newValue: number, oldValue: number) {
      console.log(newValue, oldValue);
    },
    name(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
});

type Root = typeof rootComponent;

const topNav = CustomComponent<Root, $TopNavExtend>()({
  data: {
    topNav_title: "watch",
    topNav_twTitle: " primary",
  },
  events: {
    topNav_tap() {
      wx.navigateBack();
    },
  },
});

const profileCustom = CustomComponent<
  Root,
  { properties: { profile_age: number; profile_name: string } }
>()({
  store: {
    profile_name: () => userStore.name,
  },
  computed: {
    profile_age(): number {
      return this.data.age + 1;
    },
  },
  watch: {
    user(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
    "Duser.age"(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
    age(newValue: number, oldValue: number) {
      console.log(newValue, oldValue);
    },
    profile_age(newValue: number, oldValue: number) {
      console.log(newValue, oldValue);
    },
  },
});

const watch = DefineComponent({
  path: "/pages/watch/watch",
  rootComponent,
  subComponents: [topNav, profileCustom],
});

export type $Watch = typeof watch;
```

## 参考

- 建议与 [API 总览](../api/overview.md) 配合阅读
