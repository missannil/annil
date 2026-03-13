# computed

## 行为说明

1. 计算属性在实例初始化前完成初始化，可通过 `this.data` 使用 `properties/store/data/其他computed`。
2. 由于小程序 `properties` 中对象属性默认值可能为 `null`，在计算中使用对象属性时需判空。
3. 依赖数据变化时，计算属性会自动更新。
4. 计算函数内只有 `this.data` 可用，且 `data` 只读（运行时检测）。
5. 若遇到类型推断问题，可先显式标注计算函数返回类型。

## 示例

```ts
import {
  ChunkComponent,
  CustomComponent,
  DefineComponent,
  DetailedType,
  type ExtendComponentType,
  RootComponent,
} from "annil";
import type { $TopNav } from "../../components/topNav/topNav";
import { User, userStore } from "../../moudule/userStore";

type $TopNavExtend = ExtendComponentType<
  $TopNav,
  { customEvents: { topNav_tap: null } }
>;

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
    Cage() {
      return this.data.age + 1;
    },
    CPnum() {
      return this.data.Pnum + 1;
    },
    CPobj() {
      return this.data.Puser?.age || 0;
    },
  },
});

type Root = typeof rootComponent;

const topNav = CustomComponent<Root, $TopNavExtend>()({
  data: {
    topNav_title: "computed",
    topNav_twTitle: " primary",
  },
  events: {
    topNav_tap() {
      wx.navigateBack();
    },
  },
});

const calcChunk = ChunkComponent<Root, "calc">()({
  computed: {
    calc_subCompNum(): number {
      return this.data.Cage + this.data.CPnum + this.data.age + this.data.CPobj;
    },
  },
});

const computed = DefineComponent({
  path: "/pages/computed/computed",
  rootComponent,
  subComponents: [calcChunk, topNav],
});

export type $Computed = typeof computed;
```

## 参考

- 建议与 [API 总览](../api/overview.md) 配合阅读
