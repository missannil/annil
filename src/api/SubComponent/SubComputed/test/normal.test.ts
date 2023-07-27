import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type { Mock_User } from "../../../RootComponent/Properties/test/normalRequired.test";
import { SubComponent } from "../..";

type OnlyCustomCompDoc = ComponentDoc<{
  customEvents: { aaa_str: string };
}>;

SubComponent<{}, OnlyCustomCompDoc>()({
  // 1 CompDoc的properties为空时,可以写{}
  computed: {},
});

type OnlyPropsCompDoc = ComponentDoc<{
  properties: {
    aaa_str: "a" | "b";
    aaa_num?: number;
    aaa_num123: 123;
    aaa_obj?: Mock_User | null;
  };
}>;

SubComponent<{ properties: { aaa: 123 } }, OnlyPropsCompDoc>()({
  inherit: {
    aaa_num: "aaa",
  },
  data: {
    aaa_str: "a",
  },
  // 2 可写字段为组件去除inherit和computed的剩余字段,返回类型应为对应的文档类型
  computed: {
    aaa_obj() {
      return { id: "123" };
    },
    aaa_num123() {
      // ⚠️字面量必须加const,TS的原因
      return 123 as const;
    },
  },
});

// 3 书写第一个计算字段有提示(默认约束为{}导致)。
SubComponent<{ properties: { aaa_123: number } }, OnlyPropsCompDoc>()({
  data: {
    aaa_str: "a",
  },
  // 3.1 输入aaa 提示 3个字段
  computed: {
    aaa_num() {
      return 123;
    },
  },
});

SubComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_num: "wxml",
  },
  // 3.2 输入aaa 提示 2个字段
  computed: {
    aaa_obj: () => null,
    aaa_str() {
      return "a" as const;
    },
  },
});

SubComponent<{}, OnlyPropsCompDoc>()({
  inherit: {
    aaa_num: "wxml",
  },
  data: {
    aaa_str: () => "a",
  },
  // 3.3 输入aaa 提示 1个字段
  computed: {
    aaa_obj: () => null,
  },
});

// 4 ⚠️ 字面量类型需要加const. 未知的原因
SubComponent<{}, OnlyPropsCompDoc>()({
  computed: {
    aaa_str() {
      return "a" as const; // 不加const报错
    },
  },
});

//
SubComponent<{}, OnlyPropsCompDoc>()({
  computed: {
    aaa_num() {
      return 123;
    },
    aaa_num123() {
      return 123 as const;
    },
    aaa_str() {
      return "a" as const; // 不加const报错
    },
    aaa_obj() {
      this.data;

      // 5 this.data
      Checking<
        typeof this.data,
        ReadonlyDeep<{
          aaa_str: "a";
          aaa_num: number;
          aaa_num123: 123;
          aaa_obj: Mock_User;
        }>,
        Test.Pass
      >;

      return {} as Mock_User;
    },
  },
  methods: {
    aaa_ddd() {
      // 5 this.data 深度只读
      Checking<
        typeof this.data,
        ReadonlyDeep<{
          aaa_str: "a";
          aaa_num: number;
          aaa_num123: 123;
          aaa_obj: Mock_User;
        }>,
        Test.Pass
      >;
    },
  },
});
