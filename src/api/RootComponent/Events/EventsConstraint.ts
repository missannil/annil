import type { Select } from "hry-types/src/Object/_api";
import type { Detail, WMBaseEvent } from "../../../types/officialAlias";
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
  TComponentDocTuple extends ComponentDoc[],
  Result extends CustomEventsDoc = {},
> = TComponentDocTuple extends [infer Head extends ComponentDoc, ...infer Rest extends ComponentDoc[]]
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

// 所有子组件自定义事件(过滤掉非冒泡或捕获)的key加入后缀并把值(detailType)转换为函数类型
type GetAllSubCustomEventsConstraint<TReceivedComponentDoc extends ComponentDoc[] | ComponentDoc> = {} extends
  TReceivedComponentDoc ? {}
  : TReceivedComponentDoc extends ComponentDoc[] ? TransformCustomEventsDocTypeToFunctionTypeAndAddSuffix<
      GetBubblesOrCaptureEventsFromCompDoc<TReceivedComponentDoc>
    >
  : ComponentDoc["customEvents"] & {};

/**
 * events字段约束
 */
export type EventsConstraint<TReceivedComponentDoc extends ComponentDoc[] | ComponentDoc = {}> = {} extends
  TReceivedComponentDoc ? Record<string, (e: WMBaseEvent) => any>
  : TReceivedComponentDoc extends ComponentDoc ? {
      [k in keyof TReceivedComponentDoc["customEvents"]]?: (
        e: Exclude<TReceivedComponentDoc["customEvents"][k], CustomEventsTags>,
      ) => void;
    }
  : GetAllSubCustomEventsConstraint<TReceivedComponentDoc>;
// // 一般事件字段约束
// & Record<string, (e: WMBaseEvent) => any>;
