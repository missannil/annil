import { Checking, type Test } from "hry-types";

import type { DetailedType } from "./DetailedType";
import type { InferDetailedType } from "./InferDetailedType";

void Checking<InferDetailedType<StringConstructor>, string, Test.Pass>;

void Checking<InferDetailedType<NumberConstructor>, number, Test.Pass>;
void void Checking<InferDetailedType<BooleanConstructor>, boolean, Test.Pass>;
void void Checking<InferDetailedType<ArrayConstructor>, unknown[], Test.Pass>;
void void Checking<InferDetailedType<ObjectConstructor>, object, Test.Pass>;
void Checking<InferDetailedType<DetailedType<"a" | "b">>, "a" | "b", Test.Pass>;
void Checking<InferDetailedType<DetailedType<[string, number, boolean]>>, [string, number, boolean], Test.Pass>;
