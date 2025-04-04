import {
  type Bubbles,
  ChunkComponent,
  type CreateComponentType,
  DefineComponent,
  isEmptyObject,
  type ParamsEqual,
  RootComponent,
  SubComponent,
} from "../../../src";
import type { User } from "../../common";
const slot = ChunkComponent<Root, "slot">()({
  data: {
    slot_num: 123,
    slot_str: "a",
  },
  store: {
    _slot_num: () => 456,
    _slot_str: () => "b",
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
type Mock_SubComponent = CreateComponentType<"xxx", {
  properties: {
    num: number;
    user: User | null;
  };
  customEvents: {
    onTap: string | Bubbles;
  };
}>;
const subComp = SubComponent<Root, Mock_SubComponent>()({
  data: {
    xxx_num: 1,
    xxx_user: null,
  },
  store: {
    _xxx_str: () => "d",
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
    _str: () => "_str",
  },
  lifetimes: {
    created() {
      // 模拟页面给 is 因为path是根据is验证的。
      // @ts-ignore
      this.is = this.route = "pages/index/index";
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [subComp],
  slotComponents: [slot],
});
export type $IndexSlot = {
  path: "/pages/index/index";
  properties: {
    num: number;
    user: object;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type test = ParamsEqual<$IndexSlot, typeof index>;
