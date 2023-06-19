import type { FullEvent } from "./CustomEventConstraint";
import type { GetShortEventDoc } from "./GetShortEventDoc";
import type { SignForCustomEvents } from "./SignForCustomEvents";

export type GetFullEventDoc<T extends FullEvent> = T extends unknown ?
    | GetShortEventDoc<T["detailType"]>
    // 为自定义事件加标记,表示事件是否冒泡或穿透
    | SignForCustomEvents<T["options"]>
  : never;
