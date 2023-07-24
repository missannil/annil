import { Checking, type Test } from "hry-types";
import type { GetSubPropertiesDoc } from "../GetSubPropertiesDoc";

// 测试1 注意:不存在2个对象中properties字段有相同key的情况
type O1 = { properties: { a: string; b: number } };

type O2 = { properties: { c: number; d: string } };

// 测试结果
type Test1Result = GetSubPropertiesDoc<[O1, O2]>;

// 测试预期
type Test1Expect = {
  a: string;
  b: number;
} & {
  c: number;
  d: string;
};

// 验证测试1结果是否符合预期
Checking<Test1Result, Test1Expect, Test.Pass>;

// 测试2 2个对象其中一个为空对象
type O3 = { properties: { a: number; b: string } };

type O4 = {};

// 测试结果
type Test2Result = GetSubPropertiesDoc<[O3, O4]>;

// 测试预期
type Test2Expect = {
  a: number;
  b: string;
};

// 验证测试2结果是否符合预期
Checking<Test2Result, Test2Expect, Test.Pass>;
