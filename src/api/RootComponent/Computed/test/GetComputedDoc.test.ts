import { Checking, type Test } from "hry-types";
import type { GetComputedDoc } from "../GetComputedDoc";

// test1 非空对象字段

type Test1 = GetComputedDoc<{
  a: () => number;
  b: () => string;
  c: () => "male" | "femal";
}>;

type Test1Expected = {
  a: number;
  b: string;
  c: "male" | "femal";
};

Checking<Test1, Test1Expected, Test.Pass>;

// test2 空对象字段 返回空

type Test2 = GetComputedDoc<{}>;

Checking<Test2, {}, Test.Pass>;
