import type { PureObject } from "../../hry-types/src";

/**
 * @description data字段约束
 */
export type DataConstraint = PureObject;

/**
 * @description 要获取TData字段的类型
 */
export type GetDataKeyTypes = "去掉函数字段" | "返回函数字段" | "函数值类型变为函数返回类型";
