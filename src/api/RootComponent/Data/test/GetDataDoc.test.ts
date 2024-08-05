import { Checking, type Test } from "hry-types";

import type { GetDataDoc } from "../GetDataDoc";

export const mock_data = {
  func: {
    foo(num: number) {
      return num + 1;
    },
  },
  num: 2,
  str: "str",
};

type Test1 = GetDataDoc<typeof mock_data>;

type Test1Expected = {
  func: {
    foo(num: number): number;
  };
  num: number;
  str: string;
};

void Checking<Test1, Test1Expected, Test.Pass>;

// 测试空对象
type Test4 = GetDataDoc<{}>;

type Test4Expected = {};

void Checking<Test4, Test4Expected, Test.Pass>;
