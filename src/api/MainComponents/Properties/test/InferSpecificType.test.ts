import { type AnyObject, type Test, TypeChecking } from "hry-types";
import type { InferSpecificType } from "../InferSpecificType";

type str = StringConstructor;

type num = NumberConstructor;

type bool = BooleanConstructor;

type arr = ArrayConstructor;

type obj = ObjectConstructor;

type SpecificUnion = () => "a" | "b";

type SpecificUnion1 = () => [string, number, boolean];

TypeChecking<InferSpecificType<str>, string, Test.Pass>;

TypeChecking<InferSpecificType<num>, number, Test.Pass>;

TypeChecking<InferSpecificType<bool>, boolean, Test.Pass>;

TypeChecking<InferSpecificType<arr>, unknown[], Test.Pass>;

TypeChecking<InferSpecificType<obj>, AnyObject, Test.Pass>;

TypeChecking<InferSpecificType<SpecificUnion>, "a" | "b", Test.Pass>;

TypeChecking<InferSpecificType<SpecificUnion1>, [string, number, boolean], Test.Pass>;
