import { type Test, TypeChecking } from "hry-types";
import type { GetComputedDoc } from "../GetComputedDoc";

// -----------GetComputedDoc泛型测试----------------
type ComputedDoc = GetComputedDoc<{
  a: () => number;
  b: () => string;
}>;

type Expect = { a: number; b: string };

TypeChecking<ComputedDoc, Expect, Test.Pass>;

// computed默认为{}
type ComputedDocDefault = GetComputedDoc<{}>;

type Expect1 = {};

TypeChecking<ComputedDocDefault, Expect1, Test.Pass>;
