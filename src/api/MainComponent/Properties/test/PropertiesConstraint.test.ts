import type { SpecificType } from "../../../../types/SpecificType";
import type {
  OptionalTypes,
  PropertiesConstraint,
  RequiredSingle,
  RequiredTypes,
  RequiredUnion,
} from "../PropertiesConstraint";

export type Mock_User = {
  id: string;
  name: string;
  age?: number;
};

export type Mock_Cart = {
  id: string;
  selectedCount: number;
  selectedGoodsList: string[];
};

/**
 * properties 必传字段(单一类型)
 */
export const required_single = {
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
 * properties 必传字段(多类型联合)
 */
export const required_union = {
  union_multiple: {
    type: String,
    optionalTypes: [Number, Boolean],
  },
  union_multiple_literal: {
    type: Boolean,
    optionalTypes: [Number as SpecificType<0 | 1 | 2>, String as SpecificType<"male" | "female">],
  },
} satisfies Record<string, RequiredUnion>;

/**
 * 必传字段
 */
export const required_fields = {
  ...required_single,
  ...required_union,
} satisfies Record<string, RequiredTypes>;

/**
 * properties 选传字段
 */
export const optional_fields = {
  optional_str: {
    type: String,
    value: "选传字符串" as const,
  },
  optional_num: {
    type: Number as SpecificType<123 | 456>,
    value: 123 as const,
  },
  optional_obj: {
    type: Object as SpecificType<Mock_User>,
    value: {
      id: "id",
      name: "name",
      age: 20,
    },
  },
} satisfies Record<string, OptionalTypes>;

/**
 * properties 字段约束
 */
export const mock_properties = {
  ...required_fields,
  ...optional_fields,
} satisfies PropertiesConstraint;
