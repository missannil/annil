import { Checking, type Test } from "hry-types";

import type { InferSpecificType } from "./InferSpecificType";

type str = StringConstructor;

type num = NumberConstructor;

type bool = BooleanConstructor;

type arr = ArrayConstructor;

type obj = ObjectConstructor;

type SpecificUnion = () => "a" | "b";

type SpecificUnion1 = () => [string, number, boolean];

Checking<InferSpecificType<str>, string, Test.Pass>;

Checking<InferSpecificType<num>, number, Test.Pass>;

Checking<InferSpecificType<bool>, boolean, Test.Pass>;

Checking<InferSpecificType<arr>, unknown[], Test.Pass>;

Checking<InferSpecificType<obj>, object | null, Test.Pass>;

Checking<InferSpecificType<SpecificUnion>, "a" | "b", Test.Pass>;

Checking<InferSpecificType<SpecificUnion1>, [string, number, boolean], Test.Pass>;
