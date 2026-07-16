import { observable } from "mobx";
import {
  type Bubbles,
  ChunkComponent,
  type CreateComponentDoc,
  CustomComponent,
  DefineComponent,
  isEmptyObject,
  RootComponent,
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
const slot = ChunkComponent<Root, "slot">()({
  data: {
    slot_num: 123,
    slot_str: "a",
  },
  store: {
    _slot_num: () => storeUser.age,
    _slot_str: () => storeUser.name,
  },
  computed: {
    slot_count() {
      return this.data.slot_num + this.data._slot_num + this.data.num + this.data.count;
    },
    _slot_Cstr() {
      return this.data.slot_str + this.data._slot_str + this.data._str;
    },
  },
  events: {
    slot_forCoverage: () => {
      // 为了覆盖率
    },
  },
});
type Mock_SubComponent = CreateComponentDoc<"xxx", {
  properties: {
    num: number;
    user: User | null;
  };
  events: {
    onTap: string | Bubbles;
  };
}>;
const subComp = CustomComponent<Root, Mock_SubComponent>()({
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
  subComponents: [subComp, slot],
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
