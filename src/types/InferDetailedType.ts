import type { DetailedType } from "./DetailedType";

/**
 * 解析DetailedType的类型
 */
export type InferDetailedType<T> = T extends StringConstructor ? string
  : T extends NumberConstructor ? number
  : T extends BooleanConstructor ? boolean
  : T extends ArrayConstructor ? unknown[]
  : T extends ObjectConstructor ? object
  : T extends DetailedType<infer R> ? R
  : never;
