import { Checking, type Test } from "hry-types";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { DetailedType } from "../../../../types/DetailedType";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
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
      value: [1, "a", true],
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
    optional_arr: {
      type: Array as DetailedType<string[]>,
      value: [],
    },
  },
  methods: {
    foo() {
      // 1. 内部this.data中的类型(去除可选)
      void Checking<
        typeof this.data,
        ComputeIntersection<
          {
            optional_num: number;
            optional_gender: "male" | "female";
            optional_tuple: [number, string, boolean];
            optional_obj: Mock_User;
            optional_objOrNull: Mock_User | null;
            optional_union: string | number;
            optional_arr: string[];
          } & IInjectAllData
        >,
        Test.Pass
      >;
    },
  },
});
void OptionalDoc;
type OptionalDocExpected = {
  // 2. 预期返回类型 key为可选(带`?`)
  properties: {
    optional_num?: number;
    optional_gender?: "male" | "female";
    optional_tuple?: [number, string, boolean];
    optional_obj?: Mock_User;
    optional_objOrNull?: Mock_User | null;
    optional_union?: string | number;
    optional_arr?: string[];
  };
  methods: {
    foo(): void;
  };
};

void Checking<typeof OptionalDoc, OptionalDocExpected, Test.Pass>;

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
      void this.data.user?.name;
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
