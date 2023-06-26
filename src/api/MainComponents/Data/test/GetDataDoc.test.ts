import { type Test, TypeChecking } from "hry-types";

import type { Mock_User } from "../../Properties/test/PropertiesConstraint.test";
import type { DataConstraint } from "../DataConstraint";
import type { GetDataDoc } from "../GetDataDoc";
// ----------------GetDataDoc泛型测试----------------

export const mock_data = {
  reactiveUser: () => ({} as Mock_User),
  num: 2,
  str: "str",
} satisfies DataConstraint;

TypeChecking<
  GetDataDoc<typeof mock_data, "函数值类型变为函数返回类型">,
  { reactiveUser: Mock_User; num: number; str: string },
  Test.Pass
>;

TypeChecking<GetDataDoc<typeof mock_data, "去掉函数字段">, { num: number; str: string }, Test.Pass>;

TypeChecking<GetDataDoc<typeof mock_data, "返回函数字段">, { reactiveUser: () => Mock_User }, Test.Pass>;

const empty_object = {};

TypeChecking<GetDataDoc<typeof empty_object>, {}, Test.Pass>;
