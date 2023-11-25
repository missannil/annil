import type { InferSpecificType } from "../../../types/InferSpecificType";
import type { SpecificType } from "../../../types/SpecificType";
import type {
  CustomEventConstraint,
  FullCustomEvents,
  ShortCustomeEvents,
  SimpleCustomeEventsList,
} from "./CustomEventConstraint";
import type { AddTagForCustomEventsDoc } from "./CustomEventsTag";

export type GetShortCustomEventsDoc<T extends ShortCustomeEvents> = T extends SpecificType ? InferSpecificType<T>
  : T extends null ? null
  : T extends SimpleCustomeEventsList ? GetShortCustomEventsDoc<T[number]>
  : never;

export type GetFullCustomEventsDoc<T extends FullCustomEvents> =
  | GetShortCustomEventsDoc<T["detailType"]>
  | AddTagForCustomEventsDoc<T["options"]>;

/**
 * 获取自定义事件的文档
 * demo
 * ```ts
 * customEvents:{
 *   a:Number,
 *   b:{ detailType: String,options:{ bubbles:true } }
 *   c:{ detailType: Number,options:{ bubbles:true, composed:true } }
 * }
 * //result => {a:number,b:string|()=>'bubbles',c:number | ()=>'composed' }
 * ```
 * @returns object
 */
// @dprint-ignore
export type GetCustomEventDoc<T extends CustomEventConstraint> = 
  {
    [k in keyof T]: T[k] extends ShortCustomeEvents ? GetShortCustomEventsDoc<T[k]>  
    // 应该写GetFullCustomEventsDoc<T[k]>带鼠标悬停时不是计算结果。所以代码重复了。
      : // @ts-ignore T[k] 一定为 FullCustomEvents 类型
        | GetShortCustomEventsDoc<T[k]["detailType"]>
        // 为自定义事件模型加标记,方便识别
        // @ts-ignore T[k] 一定为 FullCustomEvents 类型
        | AddTagForCustomEventsDoc<T[k]["options"]>;
  }
;

// type ddd = IsUnion
