import type { IfExtends } from "hry-types/src/Any/_api";
import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { ComponentDoc } from "../api/DefineComponent/ReturnType/ComponentDoc";
import type { AddPrefix } from "./AddPrefix";

export type CreateComponentType<TName extends string, T extends ComponentDoc> = ComputeIntersection<
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
