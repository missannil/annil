import type { _IsPlainObject } from "hry-types";

/**
 * 为对象类型加入null类型。
 */
export type AddNullForObject<O> = _IsPlainObject<O> extends true ? (O | null) : O;
