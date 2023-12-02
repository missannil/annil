import { Checking, type Test } from "hry-types";

import type { DetailedType } from "./DetailedType";
import type { InferDetailedType } from "./InferDetailedType";

Checking<InferDetailedType<StringConstructor>, string, Test.Pass>;

Checking<InferDetailedType<NumberConstructor>, number, Test.Pass>;

Checking<InferDetailedType<BooleanConstructor>, boolean, Test.Pass>;

Checking<InferDetailedType<ArrayConstructor>, unknown[], Test.Pass>;

Checking<InferDetailedType<ObjectConstructor>, object, Test.Pass>;

Checking<InferDetailedType<DetailedType<"a" | "b">>, "a" | "b", Test.Pass>;

Checking<InferDetailedType<DetailedType<[string, number, boolean]>>, [string, number, boolean], Test.Pass>;
