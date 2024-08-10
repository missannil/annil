### watch字段

1. 可监控任意数据,包括properties、store、data、computed。子组件watch也可监控根组件数据。

2. 只有在数据变化(深度比较)时才会触发监控函数

3. 可监听某个子属性。例如：一级子属性"Duser.age", 二级子属性"xxx.yyy.zzz".
   ts下但不推荐超过一级子属性的监听,会导致类型系统奔溃,因为内部只写了一级子属性的类型约束和检测。

4. ts开发下,在监控计算属性数据时,需要手动书写参数类型。

5. 在watch函数中调用this.setData时应避免死循环(例如: A改变时setDataB,B改变时setDataA)

**示例**

```ts
import {
  DefineComponent,
  type DetailedType,
  type ExtendComponentType,
  RootComponent,
  SubComponent,
} from "annil";
import type { $TopNav } from "../../components/topNav/topNav";
import { User, userStore } from "../../moudule/userStore";
// 为TopNav组件添加solt的事件
type $TopNavExtend = ExtendComponentType<
  $TopNav,
  { customEvents: { topNav_tap: null } }
>;
const topNav = SubComponent<Root, $TopNavExtend>()({
  data: {
    topNav_title: "watch",
    topNav_twTitle: " primary",
  },
  events: {
    topNav_tap(e) {
      // e.detail null
      wx.navigateBack();
    },
  },
});
const subComp = SubComponent<
  Root,
  { properties: { subComp_age: number; subComp_name: string } }
>()({
  store: {
    subComp_name: () => userStore.name,
  },
  computed: {
    subComp_age(): number {
      return this.data.age + 1;
    },
  },
  watch: {
    // 监控根组件user
    user(newValue, oldValue) {
      console.log(1.2, newValue, oldValue); // 1.2 {name: "zhao", age: 20} null
    },
    // 监控根组件"Duser.age"
    "Duser.age"(newValue, oldValue) {
      console.log(6.2, newValue, oldValue); // 6.2 30 20
    },
    age(newValue: number, oldValue: number): void {
      console.log(2.2, newValue, oldValue); // 2.1 20 0
    },
    // 监控根组件name
    name(newValue, oldValue) {
      console.log(7.2, newValue, oldValue); // 7.2 "li" "zhao"
    },
    // 监控自身数据
    subComp_age(newValue: number, oldValue: number) {
      console.log(3, newValue, oldValue); // 3 21 1
    },
    // 监控自身数据
    subComp_name(newValue, oldValue) {
      console.log(7.3, newValue, oldValue); // 7.3 "li" "zhao"
    },
  },
});
type Root = typeof rootComponent;
const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    user: Object as DetailedType<User>, // 默认null
    multipleObj: Object as DetailedType<
      { subObj: { num: number }; str: string }
    >,
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
    // 监听properties数据
    user(newValue, oldValue) {
      console.log(1.1, newValue, oldValue); // 1.1 {name: "zhao", age: 20} null
    },
    // 监听data数据子字段
    "Duser.age"(newValue, oldValue) {
      console.log(6.1, newValue, oldValue); // 6.1 30 20
    },
    // 监听computed数据 注意由于某些原因，在监控计算属性时,参数newValue和oldValue都需要手动指定类型,否则会报错(隐式any),可把鼠标放在age上查看类型,再手动输入。
    age(newValue: number, oldValue: number): void {
      console.log(2.1, newValue, oldValue); // 2.1 20 0
    },
    // store数据监听
    name(newValue, oldValue) {
      console.log(7.1, newValue, oldValue); // 7.1 "li" "zhao"
    },
    // @ts-ignore 多级监听没有内部类型，会报错导致类型系统奔溃,不建议使用。
    // "multipleObj.subObj.num"(newValue: string, oldValue: string) {
    //   // console.log('多级监控', newValue, oldValue); // 多级监控 20 18
    // },
    // "multipleObj.str"(newValue:string, oldValue:string){
    //   console.log("不会被触发");
    // },
  },
  pageLifetimes: {
    onLoad(prop) {
      console.log(4, "prop.user", prop.user); // 4 { name: "zhao", age: 20 }
      // 使用 annil提供的 navigateTo触发跳转页面,支持特殊字符
      console.log(5, "prop.multipleObj", prop.multipleObj); // { subObj: { num: 18 }, str: ":?#$%^&*(={}" }
      this.setData({
        // 触发一级监听
        "Duser.age": 30,
        // @ts-ignore 触发多级监听 不建议使用
        // "multipleObj.subObj.num": 20,
      });
      userStore.changeName("li");
    },
  },
});
const watch = DefineComponent({
  path: "/pages/watch/watch",
  rootComponent,
  subComponents: [topNav, subComp],
});
export type $Watch = typeof watch;
```
