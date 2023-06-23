import { type AnyObject, type Test, TypeChecking } from "hry-types";
import type { SpecificType } from "../../../..";
import type { GetRequiredDoc } from "../GetRequiredDoc";
import type { PropertiesConstraint } from "../PropertiesConstraint";
export type Mock_User = {
  id: string;
  name: string;
};

export type Mock_Cart = {
  id: string;
  name: string;
};
export const requiredFields = {
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
} satisfies PropertiesConstraint;

export type RequiredFieldsExpected = {
  str: string;
  num: number;
  bool: boolean;
  arr: unknown[];
  obj: AnyObject | null; // 必传对象默认为null
  tuple: [string, number, boolean];
  union_str: "male" | "female";
  union_num: 0 | 1 | 2;
  union_bool: false | true;
  union_arr: number[] | string[];
  union_obj: Mock_User | Mock_Cart | null; // 必传对象默认为null
  union_multiple: string | number | boolean;
  union_multiple_literal: boolean | 0 | 1 | 2 | "male" | "female";
};

TypeChecking<GetRequiredDoc<typeof requiredFields>, RequiredFieldsExpected, Test.Pass>;

type optionalFieldsIsEmpty = {};

type RequiredFieldsIsEmptyExpected = {};

TypeChecking<GetRequiredDoc<optionalFieldsIsEmpty>, RequiredFieldsIsEmptyExpected, Test.Pass>;
