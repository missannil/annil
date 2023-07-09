import { type O, type Test, TypeChecking } from "hry-types";
import type { GetSubCustomEventDoc } from "../GetSubCustomEventDoc";

// 测试1 两个对象有相同的customEvents属性
type O1 = { properties: { a: string }; customEvents: { a: string; b: number } };

type O2 = { customEvents: { a: number; c: string } };

// 测试结果
type Test1Result = O.ComputeIntersection<GetSubCustomEventDoc<[O1, O2]>>;

// 测试预期
type Test1Expect = { a: never; b: number; c: string };

// 验证测试1结果是否符合预期
TypeChecking<Test1Result, Test1Expect, Test.Pass>;

// 测试2 2个对象无相同的customEvents属性
type O3 = { customEvents: { a: number; b: string } };

type O4 = { customEvents: { c: number; d: string } };

// 测试结果
type Test2Result = O.ComputeIntersection<GetSubCustomEventDoc<[O3, O4]>>;

// 测试预期
type Test2Expect = { a: number; b: string; c: number; d: string };

// 验证测试2结果是否符合预期
TypeChecking<Test2Result, Test2Expect, Test.Pass>;

// 测试3 2个对象其中一个为空对象
type O5 = {};

type O6 = { customEvents: { a: number; c: string } };

// 测试结果
type Test3Result = O.ComputeIntersection<GetSubCustomEventDoc<[O5, O6]>>;

// 测试预期
type Test3Expect = { a: number; c: string };

// 验证测试3结果是否符合预期
TypeChecking<Test3Result, Test3Expect, Test.Pass>;

// 测试4 2个对象其中一个为空对象
type O7 = [];

// 测试结果
type Test4Result = GetSubCustomEventDoc<O7>;

// 测试预期
type Test4Expect = {};

// 验证测试3结果是否符合预期
TypeChecking<Test4Result, Test4Expect, Test.Pass>;
