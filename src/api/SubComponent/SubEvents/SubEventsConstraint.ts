import type { Contains } from "hry-types/src/Any/Contains";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Detail, WMBaseEvent } from "../../../types/OfficialTypeAlias";
import type { ComponentType } from "../../DefineComponent/ReturnType/ComponentType";
import type { Bubbles, Capture, CustomEventsTags } from "../../RootComponent/CustomEvents/CustomEventsTag";

/**
 * 把组件事件类型转为函数类型,冒泡事件捕获事件会多一个加后缀(_catch)的key,表示阻止事件冒泡和捕获。
 */
export type SubEventsConstraint<
  CompDoc extends ComponentType,
> = {
  [
    k in keyof CompDoc["customEvents"] as Contains<CompDoc["customEvents"][k], Bubbles | Capture> extends true
      ? (k | `${k & string}_catch`)
      : k
  ]?: (
    e: IfExtends<
      // 有可能是基础组件(手写类型),所以事件类型可能为WMBaseEvent
      WMBaseEvent,
      CompDoc["customEvents"][k],
      WMBaseEvent,
      // 去除 CustomEventsTags 标记
      Detail<Exclude<CompDoc["customEvents"][k], CustomEventsTags>>
    >,
  ) => void;
};
