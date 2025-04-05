import type { WMBaseEvent } from "../../../types/OfficialTypeAlias";

export type ChunkEventsConstraint = Record<string, (e: WMBaseEvent) => void>;
