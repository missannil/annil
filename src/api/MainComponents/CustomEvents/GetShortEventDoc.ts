import type { SpecificType } from "../../../common_types/SpecificType";
import type { InferSpecificType } from "../Properties/InferSpecificType";
import type { ShortEvent } from "./CustomEventConstraint";

export type GetShortEventDoc<T extends ShortEvent> = T extends SpecificType ? InferSpecificType<T>
  : T extends SpecificType[] ? InferSpecificType<T[number]>
  : null;
