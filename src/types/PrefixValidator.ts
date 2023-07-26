/**
 * 验证泛型对象的前缀是否正确
 * @example
 * ```ts
 * // 前缀字段为 '' 时 验证结果为unknown
 * function test<T extends object>(O: T & PrefixValidator<T, "">): T {
 *  return O;
 * }
 *
 * test({
 * num: 123, // ok
 * str: "str", // ok
 * });
 *
 * // 前缀字段非空串时 泛型对象字段不满足前缀 aaa 报错
 * function test1<T extends object>(O: T & PrefixValidator<T, "aaa">): T {
 * return O;
 * }
 *
 * test1({
 * aaa: 123,
 * aaaa: "str",
 * aaa_num: 123,
 * aaaStr: "str",
 * // @ts-expect-error 前缀错误
 * str: "str",
 * // @ts-expect-error 前缀错误
 * _str: "str",
 * });
 *
 * // 前缀字段非空传时 泛型对象字段不满足前缀 aaa | _aaa报错
 * function test2<T extends object>(O: T & PrefixValidator<T, "num" | "_num">): T {
 * return O;
 * }
 *
 * test2({
 * num: 123,
 * _num: "str",
 * });
 * ```
 * @param G - 泛型对象 object
 * @param TPrefix - 前缀 string
 * @param Error - 错误提示 string
 * @returns unknown or object
 */
export type PrefixValidator<
  G extends object,
  TPrefix extends string,
  Error extends string = "前缀错误",
> = [TPrefix] extends [""] ? unknown : {
  [
    k in keyof G as k extends `${TPrefix}${string}` ? never : k
  ]: G[k] extends Function ? `⚠️${Error}` : () => `⚠️${Error}`;
};
