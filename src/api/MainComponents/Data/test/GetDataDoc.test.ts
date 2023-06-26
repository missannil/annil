import { type Test, TypeChecking } from "hry-types";

import type { DataConstraint } from "../DataConstraint";
import type { GetDataDoc } from "../GetDataDoc";
// ----------------GetDataDoc泛型测试----------------

const dataFields = {
  a: () => 1,
  b: 2,
  c: "3",
} satisfies DataConstraint;

TypeChecking<
  GetDataDoc<typeof dataFields, "函数值类型变为函数返回类型">,
  { a: number; b: number; c: string },
  Test.Pass
>;

TypeChecking<GetDataDoc<typeof dataFields, "去掉函数字段">, { b: number; c: string }, Test.Pass>;

TypeChecking<GetDataDoc<typeof dataFields, "返回函数字段">, { a: () => number }, Test.Pass>;

const empty_object = {};

TypeChecking<GetDataDoc<typeof empty_object>, {}, Test.Pass>;
