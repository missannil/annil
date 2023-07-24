import { Checking, type Test } from "hry-types";

import type { Mock_User } from "../../Properties/test/PropertiesConstraint.test";
import type { GetDataDoc } from "../GetDataDoc";
import { mock_data } from "./DataConstraint.test";

/**
 * GetDataDoc 函数值类型变为函数返回类型
 */
type DataDoc_函数值类型变为函数返回类型 = GetDataDoc<typeof mock_data, "函数值类型变为函数返回类型">;

type DataDocExpected = { reactiveUser: Mock_User; num: number; str: string };

Checking<
  DataDoc_函数值类型变为函数返回类型,
  DataDocExpected,
  Test.Pass
>;
/**
 * GetDataDoc 去掉函数字段
 */

type DataDoc_去掉函数字段 = GetDataDoc<typeof mock_data, "去掉函数字段">;

type DataDocExpected_去掉函数字段 = { num: number; str: string };

Checking<DataDoc_去掉函数字段, DataDocExpected_去掉函数字段, Test.Pass>;

/**
 * GetDataDoc 返回函数字段
 */
type DataDoc_返回函数字段 = GetDataDoc<typeof mock_data, "返回函数字段">;

type DataDocExpected_返回函数字段 = { reactiveUser: () => Mock_User };

Checking<DataDoc_返回函数字段, DataDocExpected_返回函数字段, Test.Pass>;

/**
 * GetDataDoc 空对象 函数值类型变为函数返回类型
 */
type DataDoc_empty_函数值类型变为函数返回类型 = GetDataDoc<{}, "返回函数字段">;

type DataDocExpected_empty_函数值类型变为函数返回类型 = {};

Checking<
  DataDoc_empty_函数值类型变为函数返回类型,
  DataDocExpected_empty_函数值类型变为函数返回类型,
  Test.Pass
>;

/**
 * GetDataDoc 空对象 去掉函数字段
 */
type DataDoc_empty_去掉函数字段 = GetDataDoc<{}, "去掉函数字段">;

type DataDocExpected_empty_去掉函数字段 = {};

Checking<
  DataDoc_empty_去掉函数字段,
  DataDocExpected_empty_去掉函数字段,
  Test.Pass
>;

/**
 * GetDataDoc 空对象 返回函数字段
 */
type DataDoc_empty_返回函数字段 = GetDataDoc<{}, "返回函数字段">;

type DataDocExpected_empty_返回函数字段 = {};

Checking<
  DataDoc_empty_返回函数字段,
  DataDocExpected_empty_返回函数字段,
  Test.Pass
>;
