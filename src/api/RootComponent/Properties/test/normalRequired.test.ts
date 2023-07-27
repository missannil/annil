import { Checking, type Test } from "hry-types";
import type { SpecificType } from "../../../../types/SpecificType";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import { RootComponent } from "../..";
import type { RequiredSingle, RequiredType, RequiredUnion } from "../PropertiesConstraint";

/**
 * 共用测试对象类型
 */
export type Mock_User = {
  id: string;
  age?: number;
};

/**
 * 共用测试对象类型
 */
export type Mock_Cart = {
  id: string;
  selectedCount: number;
};

/**
 *  properties 必传单一类型配置
 */
export const mock_requiredSingle = {
  str: String,
  num: Number,
  bool: Boolean,
  arr: Array,
  obj: Object,
  tuple: Array as unknown as SpecificType<[string, number, boolean]>,
  union_str: String as SpecificType<"male" | "female">,
  union_num: Number as SpecificType<0 | 1 | 2>,
  union_bool: Boolean as SpecificType<false | true>,
  union_arr: Array as SpecificType<number[] | string[]>,
  union_obj: Object as SpecificType<Mock_User | Mock_Cart>,
} satisfies Record<string, RequiredSingle>;

/**
 * properties 必传联合类型配置
 */
export const mock_requiredUnion = {
  union_str_num_bool: {
    type: String,
    optionalTypes: [Number, Boolean],
  },
  union_literalStr_Literalnum: {
    type: String as SpecificType<"male" | "female">,
    optionalTypes: [Number as SpecificType<0 | 1 | 2>],
  },
  union_mockUser_num: {
    type: Object as SpecificType<Mock_User>,
    optionalTypes: [Number],
  },
  union_num_mockUser: {
    type: Number,
    optionalTypes: [Object as SpecificType<Mock_User>],
  },
} satisfies Record<string, RequiredUnion>;

/**
 * properties 必传字段全配置(单一类型 + 联合类型)
 */
export const mock_requiredTypes = {
  ...mock_requiredSingle,
  ...mock_requiredUnion,
} satisfies Record<string, RequiredType>;

type RequiredTypeExpected = {
  str: string;
  num: number;
  bool: boolean;
  arr: unknown[];
  obj: object | null;
  tuple: [string, number, boolean];
  union_str: "male" | "female";
  union_num: 0 | 1 | 2;
  union_bool: boolean;
  union_arr: number[] | string[];
  union_obj: Mock_User | Mock_Cart | null;
  union_str_num_bool: string | number | boolean;
  union_literalStr_Literalnum: 0 | 1 | 2 | "male" | "female";
  union_mockUser_num: number | Mock_User | null;
  union_num_mockUser: number | Mock_User | null;
};

const RequiredDoc = RootComponent()({
  properties: mock_requiredTypes,
  methods: {
    foo() {
      // 1 this.data中的类型(对象类型加null)
      Checking<typeof this.data, ReadonlyDeep<RequiredTypeExpected>, Test.Pass>;
    },
  },
});
/**
 * 2 properties配置为必传类型时预期文档类型(与this.data一致)
 */
export type RequiredDocExpected = {
  properties: RequiredTypeExpected;
  methods: { foo: () => void };
};

Checking<typeof RequiredDoc, RequiredDocExpected, Test.Pass>;
