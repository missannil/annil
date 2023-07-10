import type { IfExtends } from "hry-types/src/Any/IfExtends";

/**
 * 字段前缀验证器
 */
export type PrefixValidator<
  O,
  TPrefix extends string,
> = IfExtends<
  TPrefix,
  "",
  // 内部字段不可写验证
  {
    [k in keyof O as k extends `_${string}` ? k : never]: O[k] extends Function ? `⚠️不可写内部字段⚠️`
      : () => `⚠️不可写内部字段⚠️`;
  },
  {
    [
      k in keyof O as k extends `${TPrefix}_${string}` ? never
        : k
    ]: O[k] extends Function ? `⚠️前缀应为${TPrefix}⚠️` : () => `⚠️前缀应为${TPrefix}⚠️`;
  }
>;
