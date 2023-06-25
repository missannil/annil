import { type Test, TypeChecking } from "hry-types";

import type { GetDataDoc } from "../GetDataDoc";
// ----------------GetDataDoc泛型测试----------------

type testData = { a: () => number; b: number; c: string };

TypeChecking<GetDataDoc<testData, "函数值类型变为函数返回类型">, { a: number; b: number; c: string }, Test.Pass>;

TypeChecking<GetDataDoc<testData, "去掉函数字段">, { b: number; c: string }, Test.Pass>;

TypeChecking<GetDataDoc<testData, "返回函数字段">, { a: () => number }, Test.Pass>;

type dataDefault = {};

TypeChecking<GetDataDoc<dataDefault>, {}, Test.Pass>;
