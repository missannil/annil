import type { WMTriggerEventOption } from "../../../common_types/officialAlias";
import type { SpecificType } from "../../../common_types/SpecificType";

export type ShortEvent = SpecificType | SpecificType[] | null;
export type FullEvent = {
  detailType: ShortEvent;
  options: WMTriggerEventOption;
};

export type CustomEventConstraint = Record<string, FullEvent | ShortEvent>;
