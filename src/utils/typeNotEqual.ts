import type { IsEqual } from "hry-types";
/**
 * 验证两个类型是否不相等。
 *
 * @remarks
 * 仅用于编译期类型检查，不产生任何运行时行为。
 *
 * 支持两种使用方式：
 *
 * 1. 直接比较两个类型：
 *    `typeNotEqual<A, B>()`
 *
 * 2. 验证值的类型：
 *    `typeNotEqual<A>()(value)`
 *
 * @example
 *
 * ```ts
 * const a = 1;
 * type A = typeof a;
 *
 * const b = 2;
 * type B = typeof b;
 *
 * type C = 1;
 *
 * // A 与 B 不相等，不报错。
 * typeNotEqual<A, B>();
 *
 * // A 与 C 相等，C 位置报错。
 * typeNotEqual<A, C>();
 *
 * // b 的类型与 A 不相等，不报错。
 * typeNotEqual<A>()(b);
 *
 * // a 的类型与 A 相等，a 位置报错。
 * typeNotEqual<A>()(a);
 * ```
 */
export function typeNotEqual<
  const A,
  const B extends IsEqual<A, B> extends false ? unknown : never,
>(): () => void;

export function typeNotEqual<
  const A,
>(): <B>(
  b:
    & B
    & (
      IsEqual<A, B> extends false ? unknown
        : never
    ),
) => void;

export function typeNotEqual(): (b?: never) => void {
  return () => void 0;
}
