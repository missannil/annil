import type { Equals } from "hry-types/src/Any/Equals";

/**
 * 类型相等验证,用于测试。
 * @example
 * ```ts
 * Checking<1, 1> // no error;
 * Checking<1, 0> // error at 0;
 * ```
 */
export function typeEqual<
  A,
  B extends Equals<A, B> extends true ? unknown : never,
>() {
  void 0;
}
