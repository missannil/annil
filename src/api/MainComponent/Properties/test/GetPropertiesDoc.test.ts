import { Checking, type Test } from "hry-types";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { GetPropertiesDoc } from "../GetPropertiesDoc";
import { type OptionalFieldsExpected } from "./GetOptionalDoc.test";
import { type RequiredFieldsExpected } from "./GetRequiredDoc.test";
import { mock_properties } from "./PropertiesConstraint.test";

type PropertieFieldsDoc = GetPropertiesDoc<typeof mock_properties>;

type PropertieFieldsExpected = ComputeIntersectionDeep<OptionalFieldsExpected & RequiredFieldsExpected>;

Checking<PropertieFieldsDoc, PropertieFieldsExpected, Test.Pass>;

// 字段为空时
type FieldsIsEmpty = GetPropertiesDoc<{}>;

type FieldsIsEmptyExpected = {};

Checking<FieldsIsEmpty, FieldsIsEmptyExpected, Test.Pass>;
