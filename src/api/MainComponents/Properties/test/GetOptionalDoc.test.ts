import { type AnyObject, type Test, TypeChecking } from "hry-types";
import type { SpecificType } from "../../../..";
import type { GetOptionalDoc } from "../GetOptionalDoc";
import type { PropertiesConstraint } from "../PropertiesConstraint";

export const optionalFields = {
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
} satisfies PropertiesConstraint;

export type optionalFieldsExpected = {
  literal_str?: `${number}:${number}`;
  literal_num?: 123 | 456;
  unionObj?: AnyObject | number;
};

TypeChecking<GetOptionalDoc<typeof optionalFields>, optionalFieldsExpected, Test.Pass>;

type optionalFieldsIsEmpty = {};

type optionalFieldsIsEmptyExpected = {};

TypeChecking<GetOptionalDoc<optionalFieldsIsEmpty>, optionalFieldsIsEmptyExpected, Test.Pass>;
