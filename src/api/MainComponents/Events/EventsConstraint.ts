import type { WMBaseEvent } from "../../../common_types/officialAlias";

/**
 *  事件字段约束
 */
export type EventsConstraint = Record<string, (e: WMBaseEvent) => any>;
