import type { WMTriggerEventOption } from "../officialAlias";
import type { SpecificType } from "../SpecificType";

type ShortEvent = SpecificType | SpecificType[] | null;
export type FullEvent = {
  detailType: ShortEvent;
  options: WMTriggerEventOption;
};

export type CustomEventConstraint = Record<string, FullEvent | ShortEvent>;
