import { DefineComponent, RootComponent, SubComponent } from "../../src";
import { mock_beforeCreate } from "./beforeCreate.test";

type User = { name: string; age: number };

const sub = SubComponent<Root, { properties: { aaa_num: number; aaa_user: User | null } }>()({
  data: {
    aaa_num: 456,
    aaa_user: null,
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  properties: {
    user: Object,
  },
  data: {
    arr: [],
  },
  computed: {
    Carr() {
      // 为了完成data-tracer.ts 第36行的代码覆盖率
      return this.data.arr.slice();
    },
  },
  lifetimes: {
    beforeCreate: mock_beforeCreate.beforeCreate,
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});
