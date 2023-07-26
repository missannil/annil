import type { SpecificType } from "./SpecificType";
/**
 * 从SpecificType类型推断出真实类型
 */
export type InferSpecificType<T> = T extends StringConstructor ? string
  : T extends NumberConstructor ? number
  : T extends BooleanConstructor ? boolean
  : T extends ArrayConstructor ? unknown[]
  : T extends ObjectConstructor ? object
  : T extends SpecificType<infer R> ? R
  : never;
