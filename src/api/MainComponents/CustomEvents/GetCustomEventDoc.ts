import type { CustomEventConstraint, FullCustomEvents, ShortCustomeEvents } from "./CustomEventConstraint";
import type { GetFullCustomEventsDoc } from "./GetFullCustomEventsDoc";
import type { GetShortCustomEventsDoc } from "./GetShortCustomEventsDoc";

/**
 * 获取自定义事件的文档
 * 去除options字段,添加Sign
 * demo
 * ```ts
 * customEvents:{
 *   a:Number,
 *   b:{ detailType: String,options:{ bubbles:true } }
 *   c:{ detailType: Number,options:{ bubbles:true, composed:true } }
 * }
 * //result => {a:number,b:string|()=>'bubbles',c:number | ()=>'composed' }
 * ```
 * @returns AnyObject
 */
export type GetCustomEventDoc<T extends CustomEventConstraint> = {
  [k in keyof T]: T[k] extends ShortCustomeEvents ? GetShortCustomEventsDoc<T[k]>
    : T[k] extends FullCustomEvents ? GetFullCustomEventsDoc<T[k]>
    : never;
};
