import { typeEqual } from "../../../../utils/typeEqual";

import type { GetDataDef } from "../GetDataDef";

export const mock_data = {
  func: {
    foo(num: number) {
      return num + 1;
    },
  },
  num: 2,
  str: "str",
};

type Test1 = GetDataDef<typeof mock_data>;

type Test1Expected = {
  func: {
    foo(num: number): number;
  };
  num: number;
  str: string;
};

void typeEqual<Test1, Test1Expected>;

// 测试空对象
type Test4 = GetDataDef<{}>;

type Test4Expected = {};

void typeEqual<Test4, Test4Expected>;
