import type { Equals } from "hry-types/src/Any/Equals";
export type InqualityCall<A> = <const B>(b: B, ...nullable: Equals<A, B> extends false ? [] : [never]) => void;

/**
 * 类型和变量不等验证
 * @example
 * ```ts
 * const a = { a: 1 } as const;
 * type B = { a: number };
 * typeNotEqual<B>()(a); 不报错
 * ```
 */
export function typeNotEqual<
  const A,
>(): InqualityCall<A>;

/**
 * 二个类型不等验证
 * @example
 * ```ts
 * const a = 1;
 * type A = typeof a;
 * const b = 2;
 * type B = typeof b;
 * typeNotEqual<A, B>(); 不报错
 */
export function typeNotEqual<
  const A,
  const B extends Equals<A, B> extends false ? unknown : never = never,
>(): void;
/**
 * 类型不等验证
 * @example
 * ```ts
 * const a = 1;
 * type A = typeof a;
 * const b = 2;
 * type B = typeof b;
 * typeNotEqual<A, B>(); // 不报错
 * typeNotEqual<A>()(b); // 不报错
 * typeNotEqual<A>()(a); // 报错
 * ```
 */
export function typeNotEqual<
  const A,
>(): void | InqualityCall<A> {
  void 0;
}
