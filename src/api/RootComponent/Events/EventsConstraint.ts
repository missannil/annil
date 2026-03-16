// import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IfExtends } from "hry-types/src/Any/_api";
import type { Select } from "hry-types/src/Object/_api";
import type { Detail, WMBaseEvent } from "../../../types/OfficialTypeAlias";
import type { ComponentDoc } from "../../DefineComponent/ReturnType/ComponentDoc";
import type { CustomEventsDoc } from "../CustomEvents/CustomEventsDoc";
import type {
  Bubbles,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
  CustomEventsTags,
} from "../CustomEvents/CustomEventsTag";

// 选择冒泡和穿透的事件
type FilterNormalFields<O extends object> = Select<O, Bubbles | Capture, "contains->">;

// 获取冒泡或捕获的事件
type GetBubblesOrCaptureEventsFromCompDoc<
  ComponentDocList extends ComponentDoc[],
  Result extends CustomEventsDoc = {},
> = ComponentDocList extends [infer Head extends ComponentDoc, ...infer Rest extends ComponentDoc[]]
  ? GetBubblesOrCaptureEventsFromCompDoc<
    Rest,
    Result & (FilterNormalFields<Head["customEvents"] & {}>)
  >
  : Result;

// 根据value类型 增加key的后缀
type _AddSuffixForKey<key extends string, Value extends CustomEventsTags> = Value extends BubblesComposed
  ? `${key}_bubbles` | `${key}_bubbles_catch`
  : Value extends CaptureComposed ? `${key}_capture` | `${key}_capture_catch`
  : Value extends BubblesCaptureComposed ? `${key}_bubbles&capture` | `${key}_bubbles&capture_catch`
  : never;

// 把自定义事件文档类型变为函数类型并加入后缀
type TransformCustomEventsDocTypeToFunctionTypeAndAddSuffix<T extends CustomEventsDoc> = {
  [
    k in keyof T as _AddSuffixForKey<k & string, Extract<T[k], CustomEventsTags>>
  ]?: (
    detail: Detail<
      Exclude<
        T[k],
        CustomEventsTags
      >
    >,
  ) => void;
};

// 所有子组件自定义事件(过滤掉非冒泡或捕获)的key加入后缀并把值(detail)转换为函数类型
type GetAllSubCustomEventsConstraint<
  ComponentDocList extends ComponentDoc[],
  AllCustomEvents extends CustomEventsDoc = GetBubblesOrCaptureEventsFromCompDoc<ComponentDocList>,
> = IfExtends<
  {},
  AllCustomEvents,
  BaseEvent,
  TransformCustomEventsDocTypeToFunctionTypeAndAddSuffix<
    AllCustomEvents
  >
>;

type BaseEvent = Record<string, (e: WMBaseEvent) => unknown>;

/**
 * events字段约束 由自身事件和冒泡的子组件事件组成。带前缀是子组件事件,带后缀(_catch)表示阻止冒泡
 */
export type EventsConstraint<ComponentDocList extends ComponentDoc[] = []> = IfExtends<
  [],
  ComponentDocList,
  BaseEvent,
  GetAllSubCustomEventsConstraint<ComponentDocList>
>;
