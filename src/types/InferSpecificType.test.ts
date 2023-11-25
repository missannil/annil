import { Checking, type Test } from "hry-types";

import type { InferSpecificType } from "./InferSpecificType";
import type { SpecificType } from "./SpecificType";

Checking<InferSpecificType<StringConstructor>, string, Test.Pass>;

Checking<InferSpecificType<NumberConstructor>, number, Test.Pass>;

Checking<InferSpecificType<BooleanConstructor>, boolean, Test.Pass>;

Checking<InferSpecificType<ArrayConstructor>, unknown[], Test.Pass>;

Checking<InferSpecificType<ObjectConstructor>, object, Test.Pass>;

Checking<InferSpecificType<SpecificType<"a" | "b">>, "a" | "b", Test.Pass>;

Checking<InferSpecificType<SpecificType<[string, number, boolean]>>, [string, number, boolean], Test.Pass>;
