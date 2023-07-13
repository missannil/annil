import type { Equals } from "hry-types/src/Any/Equals";

/**
 * Remove `N` entries out of `L`
 * @param L to remove from
 * @param N to remove out
 * @param way (?=`'->'`) from front: '->', from end: '<-'
 * @returns [[unknown[]]]
 * @example
 * ```ts
 * ```
 */
export type Drop<L extends unknown[], A> = L extends [infer Head, ...infer Rest]
  ? Equals<A, Head> extends true ? Rest : Drop<[...Rest, Head], A>
  : L;

// type Test = Drop<[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3>[number];

// type TestExpect = [4, 5, 6, 8, 7, 9, 10, 1, 2][number];

// TypeChecking<Test, TestExpect, Test.Pass>;
