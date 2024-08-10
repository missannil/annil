**RootComponent下的computed字段**

1. 计算属性初始化在实例初始化之前,可以通过this.data使用任意数据(properties,store,data,其他的computed,根数据)。

2. 由于小程序properties的对象属性默认值为null,所以在computed中使用properties中的对象属性时,需要判断是否为null。ts类型会给您提示。

3. 当计算属性依赖的数据发生变化时,会自动更新计算属性的值。

4. 计算属性函数的this下,除了data字段外(其他为undefined),且data字段只读的,不可修改。(运行时检测)

5. 当遇到类型错误时,先显式书写出计算函数的返回值类型。

**计算属性示例**

```ts
import {
  DefineComponent,
  DetailedType,
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
    topNav_title: "computed",
    topNav_twTitle: " primary",
  },
  events: {
    topNav_tap(e) {
      // e.detail null
      wx.navigateBack();
    },
  },
});
const subComp = SubComponent<Root, { properties: { subComp_num: number } }>()({
  computed: {
    // 使用根组件的计算属性,ts开发时,由于泛型的内部调用时许,在遇到类型错误时,先把计算属性的返回类型明确写出来,再调试。下面的类型不写，会导致实例中无法访问到subComp_num属性。
    subComp_num(): number {
      return this.data.Cage + this.data.CPnum + this.data.age + this.data.CPobj;
    },
  },
  pageLifetimes: {
    onLoad(props) {
      console.log("props.Puser", props.Puser); // {name: "zhao", age: 20}
      console.log("props.Pnum", props.Pnum); // undefined
      console.log(this.data.Cage); // 19
      console.log(this.data.CPnum); // 2
      console.log(this.data.age); // 18
      console.log(this.data.CPobj); // 20
      console.log(this.data.subComp_num); // 59
      userStore.changeAge(20);
      console.log(this.data.Cage); // 21
      console.log(this.data.CPnum); // 2
      console.log(this.data.age); // 20
      console.log(this.data.CPobj); // 20
      console.log(this.data.subComp_num); // 63
    },
  },
});
type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    Pnum: {
      type: Number,
      value: 1,
    },
    Puser: Object as DetailedType<User>,
  },
  data: {
    Dstr: "miss",
  },
  store: {
    age: () => userStore.age,
  },
  computed: {
    // 使用store数据
    Cage() {
      return this.data.age + 1;
    },
    // 使用properties必传数据
    CPnum() {
      return this.data.Pnum + 1;
    },
    // 使用properties选传数据,如果是对象类型,需要判断是否存在(传值晚于页面初始化,计算属性初始化在实例构建之前)
    CPobj() {
      return this.data.Puser?.age || 0;
    },
  },
});
const computed = DefineComponent({
  path: "/pages/computed/computed",
  rootComponent,
  subComponents: [subComp, topNav],
});
export type $Computed = typeof computed;
```
