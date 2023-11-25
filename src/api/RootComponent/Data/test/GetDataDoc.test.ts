import { Checking, type Test } from "hry-types";

import type { Mock_User } from "../../Properties/test/normalRequired.test";
import type { GetDataDoc } from "../GetDataDoc";

export const mock_data = {
  reactiveUser: () => ({} as Mock_User),
  num: 2,
  str: "str",
};

type Test1 = GetDataDoc<typeof mock_data, "函数值类型变为函数返回类型">;

type Test1Expected = { reactiveUser: Mock_User; num: number; str: string };

Checking<Test1, Test1Expected, Test.Pass>;

type Test2 = GetDataDoc<typeof mock_data, "去掉函数字段">;

type Test2Expected = { num: number; str: string };

Checking<Test2, Test2Expected, Test.Pass>;

type Test3 = GetDataDoc<typeof mock_data, "返回函数字段">;

type Test3Expected = { reactiveUser: () => Mock_User };

Checking<Test3, Test3Expected, Test.Pass>;

// 测试空对象
type Test4 = GetDataDoc<{}, "返回函数字段">;

type Test4Expected = {};

Checking<Test4, Test4Expected, Test.Pass>;

type Test5 = GetDataDoc<{}, "去掉函数字段">;

Checking<Test5, Test4Expected, Test.Pass>;

type Test6 = GetDataDoc<{}, "返回函数字段">;

Checking<Test6, Test4Expected, Test.Pass>;
