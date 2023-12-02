import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { ComponentDoc } from "../api/DefineComponent/ReturnType/ComponentDoc";
import type { AddPrefix } from "./AddPrefix";

/**
 * 生成组件文档类型
 */
export type GenerateDoc<TName extends string, T extends ComponentDoc> = ComputeIntersection<
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
