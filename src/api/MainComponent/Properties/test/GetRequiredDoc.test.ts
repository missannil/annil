import { Checking, type Test } from "hry-types";
import type { GetRequiredDoc } from "../GetRequiredDoc";
import { type Mock_Cart, type Mock_User, required_fields } from "./PropertiesConstraint.test";

type RequiredFieldsDoc = GetRequiredDoc<typeof required_fields>;

export type RequiredFieldsExpected = {
  str: string;
  num: number;
  bool: boolean;
  arr: unknown[];
  obj: object | null; // 必传对象默认为null
  tuple: [string, number, boolean];
  union_str: "male" | "female";
  union_num: 0 | 1 | 2;
  union_bool: false | true;
  union_arr: number[] | string[];
  union_obj: Mock_User | Mock_Cart | null; // 必传对象默认为null
  union_multiple: string | number | boolean;
  union_multiple_literal: boolean | 0 | 1 | 2 | "male" | "female";
};

Checking<RequiredFieldsDoc, RequiredFieldsExpected, Test.Pass>;

type RequiredFieldsIsEmpty = GetRequiredDoc<{}>;

type RequiredFieldsIsEmptyExpected = {};

Checking<RequiredFieldsIsEmpty, RequiredFieldsIsEmptyExpected, Test.Pass>;
