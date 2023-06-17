import type { Cast } from "hry-types/src/Any/Cast";
import type { CustomEventConstraint, FullEvent, ShortEvent } from "./CustomEventConstraint";
import type { GetFullEventDoc } from "./GetFullEventDoc";
import type { GetShortEventDoc } from "./GetShortEventDoc";

/**
 * 把冒泡和穿透的事件去除options字段,添加mark为了减少类型提示中的 “...”,还方便类型推导
 * demo
 * ```ts
 * customEvents:{
 *   a:Number,
 *   b:{ detailType: String,options:{ bubbles:true } }
 *   c:{ detailType: Number,options:{ bubbles:true, composed:true } }
 * }
 * //result => {a:number,b:string|()=>'bubbles',c:number | ()=>'composed' }
 * ```
 */
export type GetCustomEventDoc<T extends CustomEventConstraint> = {
  [k in keyof T]: T[k] extends ShortEvent ? GetShortEventDoc<T[k]>
    : GetFullEventDoc<Cast<T[k], FullEvent>>;
};
