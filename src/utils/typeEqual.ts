import type { Equals } from "hry-types/src/Any/Equals";
/**
 * 类型相等验证
 * @example
 * ```ts
 * const a = { a: 1 };
 * type A = Typeof a;
 * type B = { a: number };
 * typeEqual<A, B>(); 全类型比对
 * typeEqual<A>(a); 类型和值比对
 * ```
 */
export function typeEqual<
  A,
  B extends Equals<A, B> extends true ? unknown : never = never,
>(value?: NoInfer<A>) {
  void value;
}
