### store字段

1. store数据基于mobx生成的响应式数据。推荐使用最新的mobx,性能更好。

2. store数据变化,通过深度比较,判定是否触发this.setData修改实例数据。

3. 修改store数据,要使用store的内部方法才可以。

4. 当发现数据变化没有符合预期时,应检测store数据是否为响应式数据(或许忘写了什么)

5. store数据初始化在组件实例建立之前时,建立reaction在attached生命周期并会检查当前值是否和初始化时值是否一致,不一致立即setData一次,避免因为实例缓存,二次打开同一页面引起的数据不同步问题。

#### 示例

```ts
import {
  DefineComponent,
  type ExtendComponentType,
  RootComponent,
  SubComponent,
} from "annil";
import type { $TopNav } from "../../components/topNav/topNav";
import { userStore } from "../../moudule/userStore";
// 为TopNav组件添加solt的事件
type $TopNavExtend = ExtendComponentType<
  $TopNav,
  { customEvents: { topNav_tap: null } }
>;
const topNav = SubComponent<Root, $TopNavExtend>()({
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
// 子组件store的使用
const subStore = SubComponent<Root, { properties: { sub_age: number } }>()({
  store: {
    sub_age: () => userStore.age,
  },
  watch: {
    sub_age: (newVal, oldVal) => {
      console.log(4, "subA_age changed", newVal, oldVal); // 4 "subA_age changed" 20 18
    },
  },
});
type Root = typeof rootComponent;
// 根组件store的使用
const rootComponent = RootComponent()({
  isPage: true,
  store: {
    userName: () => userStore.name,
  },
  watch: {
    userName: (newVal, oldVal) => {
      console.log(2, "userName changed", newVal, oldVal); // 2 "userName changed" "zhang" "zhao"
    },
  },
  lifetimes: {
    attached() {
      console.log(1);
      userStore.changeName("zhang");
      console.log(3);
      userStore.changeAge(20);
    },
  },
});
const store = DefineComponent({
  path: "/pages/store/store",
  rootComponent,
  subComponents: [topNav, subStore],
});
export type $Store = typeof store;
```
