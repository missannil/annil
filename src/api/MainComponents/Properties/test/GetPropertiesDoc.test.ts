import { type Test, TypeChecking } from "hry-types";
import type { GetPropertiesDoc } from "../GetPropertiesDoc";
import type { PropertiesConstraint } from "../PropertiesConstraint";
import { optionalFields, type optionalFieldsExpected } from "./GetOptionalDoc.test";
import { requiredFields, type RequiredFieldsExpected } from "./GetRequiredDoc.test";

const PropertieFields = {
  ...optionalFields,
  ...requiredFields,
} satisfies PropertiesConstraint;

type PropertieFieldsExpected = optionalFieldsExpected & RequiredFieldsExpected;

TypeChecking<GetPropertiesDoc<typeof PropertieFields>, PropertieFieldsExpected, Test.Pass>;
