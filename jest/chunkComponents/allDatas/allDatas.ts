import { observable } from "mobx";
import {
  type Bubbles,
  type CreateComponentType,
  DefineComponent,
  isEmptyObject,
  RootComponent,
  SubComponent,
  typeEqual,
} from "../../../src";
import type { User } from "../../common";
const storeUser = observable({
  age: 10,
  name: "annil",
  changeAge() {
    this.age += 1;
  },
});
type Mock_SubComponent = CreateComponentType<"xxx", {
  properties: {
    num: number;
    user: User | null;
  };
  events: {
    onTap: string | Bubbles;
  };
}>;
const subComp = SubComponent<Root, Mock_SubComponent>()({
  data: {
    xxx_num: 1,
    xxx_user: null,
  },
  store: {
    _xxx_str: () => storeUser.name,
  },
  computed: {
    _xxx_num() {
      // 为了覆盖率
      isEmptyObject([]);
      return 123;
    },
  },
});
type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  isPage: true, // 故意写错了
  properties: {
    num: Number,
    user: Object,
  },
  data: {
    count: 100,
  },
  computed: {
    str() {
      return "c";
    },
  },
  store: {
    _str: () => storeUser.name,
  },
  lifetimes: {
    created() {
      // 模拟页面给 is 因为path是根据is验证的。
      this.is = this.route = "pages/index/index";
    },
  },
});
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [subComp],
  // slotComponents: [],
});
export type $IndexSlot = {
  path: "/pages/index/index";
  properties: {
    num: number;
    user: object;
  };
};

typeEqual<$IndexSlot>()(index);
