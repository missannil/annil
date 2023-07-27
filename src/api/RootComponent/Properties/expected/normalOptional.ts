import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { SpecificType } from "../../../../types/SpecificType";
import { RootComponent } from "../..";
import { type Mock_User } from "./normalRequired";

/**
 * 1 properties字段选传类型配置  类型为[OptionalType](../PropertiesConstraint.ts)
 */
const OptionalDoc = RootComponent()({
  properties: {
    optional_num: { // 普通类型
      type: Number,
      value: 123,
    },
    optional_gender: {
      type: String as SpecificType<"male" | "female">, // 同类字面量联合类型
      value: "male",
    },
    optional_tuple: {
      type: Array as unknown as SpecificType<[number, string, boolean]>, // 元组类型
      value: [1, "a", true] as [number, string, boolean],
    },
    optional_obj: {
      type: Object as SpecificType<Mock_User>, // 对象类型
      value: {
        id: "id",
        age: 20,
      },
    },
    optional_objOrNull: {
      type: Object as SpecificType<Mock_User>,
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
      // 2. 内部this.data中的类型(去除可选)
      Checking<
        typeof this.data,
        ReadonlyDeep<{
          optional_num: number;
          optional_gender: "male" | "female";
          optional_tuple: [number, string, boolean];
          optional_obj: Mock_User | null;
          optional_objOrNull: Mock_User | null;
          optional_union: string | number;
        }>,
        Test.Pass
      >;
    },
  },
});

type OptionalDocExpected = {
  // 3. 预期返回类型 key为可选(带`?`)

  optional_num?: number;
  optional_gender?: "male" | "female";
  optional_tuple?: [number, string, boolean];
  optional_obj?: Mock_User | null;
  optional_objOrNull?: Mock_User | null;
  optional_union?: string | number;
};

Checking<typeof OptionalDoc["properties"], OptionalDocExpected, Test.Pass>;
