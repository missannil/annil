import type { Equals } from "hry-types/src/Any/Equals";

/**
 * 从' T '中删除' A '项
 * @param T - 元组类型
 * @param A - 任意类型
 * @returns [[unknown[]]]
 * @example
 */
export type Drop<T extends unknown[], A> = T extends [infer Head, ...infer Rest]
  ? Equals<A, Head> extends true ? Rest : Drop<[...Rest, Head], A>
  : T;

// // type Test = Drop<[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3>[number];

// // type TestExpect = [4, 5, 6, 8, 7, 9, 10, 1, 2][number];

// // Checking<Test, TestExpect, Test.Pass>;
