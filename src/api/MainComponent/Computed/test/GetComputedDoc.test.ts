// -----------GetComputedDoc 测试----------------

import { type Test, TypeChecking } from "hry-types";
import type { ComputedConstraint } from "../ComputedConstraint";
import type { GetComputedDoc } from "../GetComputedDoc";

// ------测试1------

// 非空对象字段
const nonEmptyComputed = {
  a: () => 1,
  b: () => "1",
} satisfies ComputedConstraint;

type NonEmptyComputedResult = GetComputedDoc<typeof nonEmptyComputed>;

type NonEmptyComputedExpected = { a: number; b: string };

TypeChecking<NonEmptyComputedResult, NonEmptyComputedExpected, Test.Pass>;

// 空对象字段
const emptyComputed = {} satisfies ComputedConstraint;

type EmptyComputedResult = GetComputedDoc<typeof emptyComputed>;

type EmptyComputedExpected = {};

TypeChecking<EmptyComputedResult, EmptyComputedExpected, Test.Pass>;
