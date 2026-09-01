/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../../utils/typeEqual";
import type { GetChunkComputedDoc } from "../GetChunkComputedDoc";

// test1 非空对象字段

type Test1 = GetChunkComputedDoc<{
  a: () => number;
  b: () => string;
  c: () => "male" | "femal";
}>;

type Test1Expected = {
  a: number;
  b: string;
  c: "male" | "femal";
};

typeEqual<Test1, Test1Expected>;

// test2 空对象字段 返回空

type Test2 = GetChunkComputedDoc<{}>;

typeEqual<Test2, {}>;
