import { Checking, type Test } from "hry-types";

import type { MainComponentDoc } from "../../../../types/MainComponentDoc";
import type { SpecificType } from "../../../../types/SpecificType";
import type { Mock_User } from "../../../MainComponent/Properties/test/PropertiesConstraint.test";
import { SubComponent } from "../..";

const Main = {
  allData: {
    str: "str",
    num: 123,
  },
} satisfies MainComponentDoc;

// 默认时即  SubComponent`<{},any>`

SubComponent()({
  properties: {
    aaa: String,
    obj: Object,
    union_obj: {
      type: Object as SpecificType<Mock_User>,
      optionalTypes: [Number],
    },
    union_obj1: {
      type: Number,
      optionalTypes: [Object as SpecificType<Mock_User>],
    },
    optinal: {
      type: String,
      value: "123",
    },
  },
  data: {
    bbb: 123,
  },
  computed: {
    yyy() {
      Checking<string, typeof this.data.aaa, Test.Pass>;

      Checking<object | null, typeof this.data.obj, Test.Pass>;

      Checking<Mock_User | number | null, typeof this.data.union_obj, Test.Pass>;

      Checking<Mock_User | number, typeof this.data.union_obj1, Test.Pass>;

      Checking<string, typeof this.data.optinal, Test.Pass>;

      Checking<number, typeof this.data.bbb, Test.Pass>;

      Checking<"123", typeof this.data.zzz, Test.Pass>;

      return this.data.zzz;
    },
    zzz() {
      Checking<string, typeof this.data.aaa, Test.Pass>;

      Checking<number, typeof this.data.bbb, Test.Pass>;

      Checking<"123", typeof this.data.yyy, Test.Pass>;

      return "123";
    },
  },
});

// 可以引用MainDoc中的data

SubComponent<typeof Main, any>()({
  computed: {
    a() {
      return this.data.str;
    },
    b() {
      return this.data.num;
    },
    c() {
      return this.data.a + this.data.b;
    },
  },
});

// 两个计算属性不能相互依赖

SubComponent()({
  computed: {
    // @ts-expect-error 两个计算属性不能相互依赖
    a() {
      // @ts-ignore
      return this.data.b;
    },
    // @ts-expect-error 两个计算属性不能相互依赖
    b() {
      // @ts-ignore
      return this.data.a;
    },
  },
});

// 计算属性不可以引用自身

SubComponent()({
  computed: {
    // @ts-expect-error 引用了自身
    a() {
      // @ts-ignore
      return this.data.a;
    },
  },
});
