import type { IfExtends } from "hry-types/src/Any/_api";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { ComponentType } from "../api/DefineComponent/ReturnType/ComponentType";
import type { AddPrefix } from "./AddPrefix";

/**
 * 建立一个组件类型
 * @param TName 组件名称
 * @param T 类型配置
 * @example
 * ```ts
 * type $CustomA = CreateComponentType<"customA", {
 *   properties: { num: string };
 *   customEvents: { onTap: string }
 * }>;
 *
 * // 等同下面的类型
 * type $CustomA = {
 *    properties: {
 *      customA_num: string;
 *    };
 *    customEvents: {
 *      customA_onTap: string;
 *    };
 * ```
 */
export type CreateComponentType<TName extends string, T extends ComponentType> = ComputeIntersection<
  & IfExtends<
    unknown,
    T["properties"],
    {},
    {
      properties: AddPrefix<T["properties"] & {}, TName>;
    }
  >
  & IfExtends<unknown, T["customEvents"], {}, { customEvents: AddPrefix<T["customEvents"] & {}, TName> }>
>;
