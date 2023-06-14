import type { AnyFunction } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";

/**
 * 必传的properties字段如果类型为纯对象(非函数和数组),默认值为null,所以最终类型要加入null
 */
export type PuerObjectAddNull<O> = IfExtends<
  O,
  unknown[],
  O,
  IfExtends<
    O,
    AnyFunction,
    O,
    IfExtends<
      O,
      object,
      O | null
    >
  >
>;
