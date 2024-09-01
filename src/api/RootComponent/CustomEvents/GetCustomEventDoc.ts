import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { DetailedType } from "../../../types/DetailedType";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type {
  CustomEventConstraint,
  FullCustomEvents,
  ShortCustomeEvents,
  SimpleCustomeEventsList,
} from "./CustomEventConstraint";
import type { AddTagForCustomEventsDoc } from "./CustomEventsTag";

export type GetShortCustomEventsDoc<T extends ShortCustomeEvents> = T extends DetailedType ? InferDetailedType<T>
  : T extends null ? null
  : T extends undefined ? undefined
  : T extends SimpleCustomeEventsList ? GetShortCustomEventsDoc<T[number]>
  : never;

export type GetFullCustomEventsDoc<T extends FullCustomEvents> =
  | GetShortCustomEventsDoc<T["detail"]>
  | IfExtends<unknown, T["options"], never, AddTagForCustomEventsDoc<T["options"] & {}>>;

/**
 * 获取自定义事件的文档
 * demo
 * ```ts
 * customEvents:{
 *   a:Number,
 *   b:{ detail: String,options:{ bubbles:true } }
 *   c:{ detail: Number,options:{ bubbles:true, composed:true } }
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
        | GetShortCustomEventsDoc<T[k]["detail"]>
        // 为自定义事件模型加标记,方便识别
        // @ts-ignore T[k] 一定为 FullCustomEvents 类型
        // | AddTagForCustomEventsDoc<T[k]["options"]>;
        | IfExtends<unknown, T[k]["options"], never, AddTagForCustomEventsDoc<T[k]["options"] & {}>>;
  }
;
