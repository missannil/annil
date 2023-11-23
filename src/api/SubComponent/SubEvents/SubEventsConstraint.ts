import type { Contains } from "hry-types/src/Any/Contains";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Detail, WMBaseEvent } from "../../../types/OfficialTypeAlias";
import type { ComponentDoc } from "../../DefineComponent/ReturnType/ComponentDoc";
import type { Bubbles, Capture, CustomEventsTags } from "../../RootComponent/CustomEvents/CustomEventsTag";

export type SubEventsConstraint<
  CompDoc extends ComponentDoc,
  keys extends keyof CompDoc["customEvents"] = keyof CompDoc["customEvents"],
> = {
  [
    k in keys as Contains<CompDoc["customEvents"][k], Bubbles | Capture> extends true ? (k | `${k & string}_catch`)
      : k
  ]?: (
    e: IfExtends<
      WMBaseEvent,
      CompDoc["customEvents"][k],
      WMBaseEvent,
      Detail<Exclude<CompDoc["customEvents"][k], CustomEventsTags>>
    >,
  ) => void;
};
