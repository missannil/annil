import { type Test, TypeChecking } from "hry-types";
import type { GetOptionalDoc } from "../GetOptionalDoc";
import { type Mock_User, optional_fields } from "./PropertiesConstraint.test";

export type optionalFieldsExpected = {
  optional_str?: string;
  optional_num?: 123 | 456;
  optional_obj?: Mock_User | number;
};

TypeChecking<GetOptionalDoc<typeof optional_fields>, optionalFieldsExpected, Test.Pass>;

type optionalFieldsIsEmpty = {};

type optionalFieldsIsEmptyExpected = {};

TypeChecking<GetOptionalDoc<optionalFieldsIsEmpty>, optionalFieldsIsEmptyExpected, Test.Pass>;
