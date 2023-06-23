import type { SpecificType } from "../../..";
import type { InferSpecificType } from "../Properties/InferSpecificType";
import type { _ShortEvent, ShortEvent } from "./CustomEventConstraint";

export type GetShortEventDoc<T extends ShortEvent> = T extends SpecificType ? InferSpecificType<T>
  : T extends null ? null
  : T extends (_ShortEvent)[] ? GetShortEventDoc<T[number]>
  : never;
