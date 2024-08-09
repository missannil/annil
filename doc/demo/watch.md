### watch字段

    1. 可监控任意数据,包括properties、store、data、computed。子组件watch也可监控根组件数据。

    2. 只有在数据变化(深度比较)时才会触发监控函数

    3. 可对对象所有子属性或某个子属性(多级)进行监控。  
       例如：一级子属性"Duser.age", 二级子属性"xxx.yyy.zzz"
       
    4. ts开发下,在书写多级子属性时无ts类型(需要手动处理类型报错),在监控计算数据时 需要手动书写参数类型。

    5. 在watch函数中调用this.setData时应避免死循环(A改变setDataB,B改变setDataA)

**示例**

```ts
import {
  DefineComponent,
  type DetailedType,
  RootComponent,
  SubComponent,
} from "annil";
import { User, userStore } from "../../moudule/userStore";

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
      console.log(1.2, newValue, oldValue); // 1.2 {name: "li", age: 30} null
    },
    // 监控根组件"Duser.age"
    "Duser.age"(newValue, oldValue) {
      console.log(2.2, newValue, oldValue); // 2.2 30 20
    },
    age(newValue: number, oldValue: number): void {
      console.log(3.2, newValue, oldValue); // 3.2 30 0
    },
    // 监控根组件name
    name(newValue, oldValue) {
      console.log(6.2, newValue, oldValue); // 6.2 "li" "zhao"
    },
    // 监控自身数据
    subComp_age(newValue: number, oldValue: number) {
      console.log(4.1, newValue, oldValue); // 4.1 31 1
    },
    // 监控自身数据
    subComp_name(newValue, oldValue) {
      console.log(7, newValue, oldValue); // 7 "li" "zhao"
    },
  },
});
type Root = typeof rootComponent;
const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    user: Object as DetailedType<User>, // 默认null
    multipleObj: Object as DetailedType<{ aaa: { bbb: string }; ccc: "ddd" }>,
  },
  data: {
    Duser: { name: "zhao", age: 20 },
  },
  store: {
    name: () => userStore.name,
  },
  computed: {
    age() {
      return this.data.user?.age || 0;
    },
  },
  watch: {
    // 监听properties数据
    user(newValue, oldValue) {
      console.log(1.1, newValue, oldValue); // 1.1 {name: "li", age: 30} null
    },
    // 监听data数据子字段
    "Duser.age"(newValue, oldValue) {
      console.log(2.1, newValue, oldValue); // 2.1 30 20
    },
    // 监听computed数据 注意由于某些原因，在监控计算属性时,参数newValue和oldValue都需要手动指定类型,否则会报错(隐式any),可把鼠标放在age上查看类型,再手动输入。
    age(newValue: number, oldValue: number): void {
      console.log(3.1, newValue, oldValue); // 3.1 30 0
    },
    // store数据监听
    name(newValue, oldValue) {
      console.log(6.1, newValue, oldValue); // 6.1 "li" "zhao"
    },
    // @ts-ignore 多级监听没有类型，会报错导致类型系统奔溃 js开发当然没关系了。
    // "multipleObj.aaa.bbb"(newValue:string, oldValue:string){
    //   console.log(4, newValue, oldValue); // 4 "yyy" undefined
    // },
    // "multipleObj.ccc"(newValue:string, oldValue:string){
    //   console.log("不会被触发");
    // },
  },
  lifetimes: {
    attached() {
      console.log(0);
      this.setData({
        "Duser.age": 30,
        // 模拟properties传值
        // @ts-ignore  ts类型检测会拒绝给properties赋值
        user: { name: "li", age: 30 },
        // 触发多级监听
        "multipleObj.aaa.bbb": "yyy",
      });
      console.log(5);
      userStore.changeName("li");
    },
  },
});
const watch = DefineComponent({
  path: "/watch",
  rootComponent,
  subComponents: [subComp],
});
export type $Watch = typeof watch;
```
