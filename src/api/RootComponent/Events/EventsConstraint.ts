// import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { IfExtends } from "hry-types/src/Any/_api";
import type { Select } from "hry-types/src/Object/_api";
import type { Detail, WMBaseEvent } from "../../../types/OfficialTypeAlias";
import type { ComponentDoc } from "../../DefineComponent/returnType/ComponentDoc";
import type { CustomEventsDoc } from "../CustomEvents/CustomEventsDoc";
import type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
  CustomEventsTags,
} from "../CustomEvents/CustomEventsTag";

// 根据value类型 增加key的后缀
// 仅 Composed 事件生成 _catch 后缀——非 Composed 事件不跨组件边界传递类型
// 使用 [Value] extends [Tag] 元组包裹防止联合类型分布式匹配
// 注意：必须从最具体到最宽泛排列，因为 TypeScript 的结构类型会让子集 extend 超集
type _AddSuffixForKey<key extends string, Value extends CustomEventsTags> =
  // 单标签（最具体）
  [Value] extends [Bubbles] ? `${key}_bubbles`
    : [Value] extends [Capture] ? `${key}_capture`
    // Composed 双标签（含 _catch）
    : [Value] extends [BubblesComposed] ? `${key}_bubbles` | `${key}_bubbles_catch`
    : [Value] extends [CaptureComposed] ? `${key}_capture` | `${key}_capture_catch`
    // 双标签非 Composed
    : [Value] extends [BubblesCapture] ? `${key}_bubblesCapture`
    // Composed 三标签（最宽泛，含 _catch）
    : [Value] extends [BubblesCaptureComposed] ? `${key}_bubblesCapture` | `${key}_bubblesCapture_catch`
    : never;

// 把自定义事件文档类型变为函数类型并加入后缀
type TransformCustomEventsDocTypeToFunctionTypeAndAddSuffix<T extends object> = {
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
// 收集所有子组件自定义事件
type GetAllSubCustomEvents<TComponentDocList extends ComponentDoc[], Result extends CustomEventsDoc = {}> =
  TComponentDocList extends [infer Head extends ComponentDoc, ...infer Rest extends ComponentDoc[]]
    ? GetAllSubCustomEvents<
      Rest,
      Result & Head["events"]
    >
    : Result;
type GetBubblesOrCaptureEvents<T extends object> = Select<T, Bubbles | Capture, "contains->">;

// 所有子组件自定义事件(过滤掉非冒泡或捕获)的key加入后缀并把值(detail)转换为函数类型
type GetSubCustomEvents<
  TComponentDocList extends ComponentDoc[],
  AllSubCustomEvents extends object = GetAllSubCustomEvents<TComponentDocList>,
  BubbleOrCaptureEvents extends object = GetBubblesOrCaptureEvents<AllSubCustomEvents>,
> = IfExtends<
  {},
  BubbleOrCaptureEvents,
  unknown,
  TransformCustomEventsDocTypeToFunctionTypeAndAddSuffix<
    BubbleOrCaptureEvents
  >
>;

type BaseEvent = Record<string, (e: WMBaseEvent) => unknown>;

/**
 * events字段约束 由自身事件和冒泡的子组件事件组成。带前缀是子组件事件,带后缀(_catch)表示阻止冒泡
 */
export type EventsConstraint<ComponentDocList extends ComponentDoc[] = []> = IfExtends<
  [],
  ComponentDocList,
  // 基础事件
  BaseEvent,
  // 子组件事件类型
  & GetSubCustomEvents<ComponentDocList>
  // 基础事件
  & BaseEvent
>;
