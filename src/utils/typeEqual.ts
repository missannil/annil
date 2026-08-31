import type { IsEqual } from "hry-types";

/**
 * 验证两个类型是否相等。
 *
 * @remarks
 * 仅用于编译期类型检查，不产生任何运行时行为。
 *
 * 支持两种使用方式：
 *
 * 1. 直接比较两个类型：
 *    `typeEqual<A, B>()`
 *
 * 2. 验证值的类型：
 *    `typeEqual<A>()(value)`
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
 * // A 与 C 相等，不报错。
 * typeEqual<A, C>();
 *
 * // A 与 B 不相等，B 位置报错。
 * typeEqual<A, B>();
 *
 * // a 的类型与 A 相等，不报错。
 * typeEqual<A>()(a);
 *
 * // b 的类型与 A 不相等，b 位置报错。
 * typeEqual<A>()(b);
 * ```
 */
export function typeEqual<
  const A,
  const B extends IsEqual<A, B> extends true ? unknown : never,
>(): () => void;

export function typeEqual<
  const A,
>(): <B>(
  b:
    & B
    & (
      IsEqual<A, B> extends true ? unknown
        : never
    ),
) => void;

export function typeEqual(): (b?: never) => void {
  return () => void 0;
}
