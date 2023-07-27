import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { ComponentDoc } from "../api/DefineComponent/ReturnType/ComponentDoc";
import type { BaseEvents } from "../thirdLib/wm/baseEvents";
import type { AddPrefix } from "./AddPrefix";

export type CreateComponentDoc<TName extends string, T extends ComponentDoc> = ComputeIntersectionDeep<
  & IfEquals<
    T["properties"],
    unknown,
    {},
    {
      properties: AddPrefix<T["properties"] & {}, TName>;
    }
  >
  & { customEvents: AddPrefix<T["customEvents"] & BaseEvents, TName> }
>;
