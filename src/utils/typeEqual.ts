import type { Equals } from "hry-types/src/Any/Equals";
/**
 * 类型相等验证
 * @example
 * ```ts
 * const a = 1;
 * type A = typeof a;
 * const b = 2;
 * type B = typeof b;
 * typeEqual<A, B>(); // B位置报错
 * typeEqual<A>(a); // 不报错
 * ```
 */
export function typeEqual<
  const A,
  const B extends Equals<A, B> extends true ? unknown : never = never,
>(a?: NoInfer<A>): void {
  void a;
}
