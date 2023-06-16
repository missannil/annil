import type { SpecificType } from "../SpecificType";
export type TriggerEventOption = {
  bubbles?: boolean;
  composed?: boolean;
  capturePhase?: boolean;
};

type ShortEvent = SpecificType | SpecificType[] | null;
export type FullEvent = {
  detail: ShortEvent;
  options: TriggerEventOption;
};

export type CustomEventConstraint = Record<string, FullEvent | ShortEvent>;
