import { type Test, TypeChecking } from "hry-types";
import type { GetPropertiesDoc } from "../GetPropertiesDoc";
import { type optionalFieldsExpected } from "./GetOptionalDoc.test";
import { type RequiredFieldsExpected } from "./GetRequiredDoc.test";
import { mock_properties } from "./PropertiesConstraint.test";

type PropertieFieldsExpected = optionalFieldsExpected & RequiredFieldsExpected;

TypeChecking<GetPropertiesDoc<typeof mock_properties>, PropertieFieldsExpected, Test.Pass>;
