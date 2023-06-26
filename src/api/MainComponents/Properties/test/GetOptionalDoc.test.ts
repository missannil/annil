import { type Test, TypeChecking } from "hry-types";
import type { GetOptionalDoc } from "../GetOptionalDoc";
import { type Mock_User, optional_fields } from "./PropertiesConstraint.test";

type OptionalFieldsDoc = GetOptionalDoc<typeof optional_fields>;

export type OptionalFieldsExpected = {
  optional_str?: string;
  optional_num?: 123 | 456;
  optional_obj?: Mock_User | number;
};

TypeChecking<OptionalFieldsDoc, OptionalFieldsExpected, Test.Pass>;

// 字段为空时
type OptionalFieldsIsEmpty = GetOptionalDoc<{}>;

type OptionalFieldsIsEmptyExpected = {};

TypeChecking<GetOptionalDoc<OptionalFieldsIsEmpty>, OptionalFieldsIsEmptyExpected, Test.Pass>;
