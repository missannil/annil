import type { SpecificType } from "./SpecificType";

/**
 * 解析SpecificType的真实类型
 */
export type InferSpecificType<T> = T extends StringConstructor ? string
  : T extends NumberConstructor ? number
  : T extends BooleanConstructor ? boolean
  : T extends ArrayConstructor ? unknown[]
  : T extends ObjectConstructor ? object | null
  : T extends SpecificType<infer R> ? R
  : T;
