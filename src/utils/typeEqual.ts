import type { Equals } from "hry-types/src/Any/Equals";
/**
 * 类型相等验证
 * @example
 * ```ts
 * const a = 1;
 * type A = typeof a;
 * const b = 2;
 * type B = typeof b;
 * type C = 1;
 * typeEqual<A, C>(); // 不报错
 * typeEqual<A>()(a); // 不报错
 * typeEqual<A, B>(); // B位置报错 - 类型“2”不满足约束“never”
 * typeEqual<A>()(b); // b位置报错 - 类型“2”的参数不能赋给类型“never”的参数。
 * ```
 */
export function typeEqual<
  const A,
>(): <B>(b: B & (Equals<A, B> extends true ? unknown : never)) => void;
export function typeEqual<
  const A,
  const B extends Equals<A, B> extends true ? unknown : never,
>(): () => void;

export function typeEqual<
  const A,
  const B extends Equals<A, B> extends true ? unknown : never = never,
>(): (b?: B) => void {
  return () => void 0;
}
