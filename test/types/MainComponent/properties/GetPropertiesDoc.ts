import { type AnyObject, type Test, TypeChecking } from "hry-types";
import type { GetPropertiesDoc } from "../../../../src/types/properties/GetPropertiesDoc";
import { type Mock_Cart, Mock_Properties_value, type Mock_User } from "../../mockData";

type PropertieType = typeof Mock_Properties_value;

type GetOptionalDoc = GetPropertiesDoc<PropertieType, "Optional">;
type ExpectOptionalDoc = {
  literal_str?: `${number}:${number}`;
  literal_num?: 123 | 456;
  unionObj?: AnyObject | number;
};
type GetRequiredDoc = GetPropertiesDoc<PropertieType, "Required">;
type ExpectRequiredDoc = {
  str: string;
  num: number;
  bool: boolean;
  arr: unknown[];
  obj: AnyObject | null;
  tuple: [string, number, boolean];
  union_str: "male" | "female";
  union_num: 0 | 1 | 2;
  union_bool: boolean;
  union_arr: number[] | string[];
  union_obj: Mock_User | Mock_Cart | null;
  union_multiple: string | number | boolean;
  union_multiple_literal: boolean | 0 | 1 | 2 | "male" | "female";
};
type GetAllPropertiesDoc = GetPropertiesDoc<PropertieType, "all">;

TypeChecking<GetOptionalDoc, ExpectOptionalDoc, Test.Pass>;
TypeChecking<GetRequiredDoc, ExpectRequiredDoc, Test.Pass>;
TypeChecking<GetAllPropertiesDoc, ExpectRequiredDoc & ExpectOptionalDoc, Test.Pass>;
