import type { AnyFunction } from "hry-types";

/**
 * 必传的properties字段如果类型为纯对象(非函数和数组),默认值为null,所以最终类型要加入null
 */
export type PuerObjectAddNull<O> = O extends unknown[] ? O
  : O extends AnyFunction ? O : O extends object ? O | null : O;
