import type { FullCustomEvents } from "./CustomEventConstraint";
import type { GetShortCustomEventsDoc } from "./GetShortCustomEventsDoc";
import type { SignForCustomEvents } from "./SignForCustomEvents";

//
export type GetFullCustomEventsDoc<T extends FullCustomEvents> = T extends unknown ?
    | GetShortCustomEventsDoc<T["detailType"]>
    // 为自定义事件加标记,表示事件是否冒泡或穿透
    | SignForCustomEvents<T["options"]>
  : never;
