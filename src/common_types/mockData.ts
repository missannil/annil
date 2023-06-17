import type { SpecificType } from "../../src";

export type Mock_User = {
  id: string;
  name: string;
};

export type Mock_Cart = {
  id: string;
  name: string;
};

export const Mock_required_fields = {
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
  union_multiple: {
    type: String,
    optionalTypes: [Number, Boolean],
  },
  union_multiple_literal: {
    type: Boolean,
    optionalTypes: [Number as SpecificType<0 | 1 | 2>, String as SpecificType<"male" | "female">],
  },
};
export const Mock_optional_fields = {
  literal_str: {
    type: String as SpecificType<`${number}:${number}`>,
    value: "20:8",
  },
  literal_num: {
    type: Number as SpecificType<123 | 456>,
    value: 123,
  },
  unionObj: {
    type: Object,
    value: 123,
    optionalTypes: [Number],
  },
};

export const Mock_Properties_value = {
  ...Mock_required_fields,
  ...Mock_optional_fields,
};
