import type { WMBaseEvent } from "../../../types/OfficialTypeAlias";

export type SlotEventsConstraint = Record<string, (e: WMBaseEvent) => void>;
