import type { SpecificType } from "../../..";
import type { InferSpecificType } from "../Properties/InferSpecificType";
import type { ShortCustomeEvents, ShortCustomEventsList } from "./CustomEventConstraint";

export type GetShortCustomEventsDoc<T extends ShortCustomeEvents> = T extends SpecificType ? InferSpecificType<T>
  : T extends null ? null
  : T extends ShortCustomEventsList ? GetShortCustomEventsDoc<T[number]>
  : never;
