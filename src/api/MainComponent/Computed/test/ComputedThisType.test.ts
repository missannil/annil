import { Checking, type Test } from "hry-types";

import type { SpecificType } from "../../../../types/SpecificType";
import { MainComponent } from "../..";
import type { Mock_User } from "../../Properties/test/PropertiesConstraint.test";

/**
 * this.data类型测试
 */
MainComponent({
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

/**
 * 两个计算属性不能相互依赖
 */
MainComponent({
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
