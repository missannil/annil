import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { DetailedType } from "../../../../types/DetailedType";
import { IInjectData } from "../../../InstanceInject/instanceConfig";
import { RootComponent } from "../..";
import { type Mock_User } from "./normalRequired.test";

/**
 * properties字段选传类型配置  类型为[OptionalType](../PropertiesConstraint.ts)
 */
const OptionalDoc = RootComponent()({
  properties: {
    optional_num: { // 普通类型
      type: Number,
      value: 123,
    },
    optional_gender: {
      type: String as DetailedType<"male" | "female">, // 同类字面量联合类型
      value: "male",
    },
    optional_tuple: {
      type: Array as unknown as DetailedType<[number, string, boolean]>, // 元组类型
      value: [1, "a", true] as [number, string, boolean],
    },
    optional_obj: {
      type: Object as DetailedType<Mock_User>, // 对象类型
      value: {
        id: "id",
        age: 20,
      },
    },
    optional_objOrNull: {
      type: Object as DetailedType<Mock_User | null>, // 对象类型与null的联合
      value: null,
    },
    optional_union: { // 非同类联合类型 string | number
      type: String,
      value: "string",
      optionalTypes: [Number],
    },
  },
  methods: {
    foo() {
      // 1. 内部this.data中的类型(去除可选)
      Checking<
        typeof this.data,
        ReadonlyDeep<
          {
            optional_num: number;
            optional_gender: "male" | "female";
            optional_tuple: [number, string, boolean];
            optional_obj: Mock_User | null;
            optional_objOrNull: Mock_User | null;
            optional_union: string | number;
          } & IInjectData
        >,
        Test.Pass
      >;
    },
  },
});

type OptionalDocExpected = {
  // 2. 预期返回类型 key为可选(带`?`)
  properties: {
    optional_num?: number;
    optional_gender?: "male" | "female";
    optional_tuple?: [number, string, boolean];
    optional_obj?: Mock_User | null;
    optional_objOrNull?: Mock_User | null;
    optional_union?: string | number;
  };
  methods: {
    foo(): void;
  };
};

Checking<typeof OptionalDoc, OptionalDocExpected, Test.Pass>;

// properties 使用DetailedType时,接受interface类型
interface Foo {
  name: string;
}

RootComponent()({
  properties: {
    xxx: Object as DetailedType<{ dd: Foo }>,
    user: {
      type: Object as DetailedType<Foo>,
      value: { name: "zhao" },
    },
  },
  computed: {
    ddd() {
      this.data.user?.name;
    },
  },
});

/**
 * 对象类型字面量类型可验证通过。
 */
type obj = { gender: "male" | "femal" };

RootComponent()({
  properties: {
    obj: {
      type: Object as DetailedType<obj>,
      value: { gender: "male" },
    },
  },
});
