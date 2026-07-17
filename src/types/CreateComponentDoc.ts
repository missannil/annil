import type { IfExtends } from "hry-types/src/Any/_api";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { ComponentDoc } from "../api/DefineComponent/returnType/ComponentDoc";
import type { AddPrefix } from "./AddPrefix";
type ErrMsg = "{ properties?: Record<string, unknown>; events?: Record<string, unknown>; }";
// 验证字段
type Validator<T> = keyof T extends "properties" | "events" ? ComponentDoc
  : ErrMsg;
/**
 * 建立一个组件类型
 * @param TName 组件名称
 * @param T 类型配置
 * @example
 * ```ts
 * type $CustomA = CreateComponentType<"customA", {
 *   properties: { num: string };
 *   events: { onTap: string }
 * }>;
 *
 * // 等同下面的类型
 * type $CustomA = {
 *    properties: {
 *      customA_num: string;
 *    };
 *    events: {
 *      customA_onTap: string;
 *    };
 * ```
 */
export type CreateComponentDoc<TName extends string, T extends Validator<T>> = T extends ComponentDoc
  ? ComputeIntersection<
    & IfExtends<
      unknown,
      T["properties"],
      {},
      {
        properties: AddPrefix<T["properties"] & {}, TName>;
      }
    >
    & IfExtends<unknown, T["events"], {}, { events: AddPrefix<T["events"] & {}, TName> }>
  >
  : ErrMsg;
