/**
 * 去除前缀为`_`的字符串
 */
export type RemoveInnerData<S extends string> = S extends unknown ? S extends `_${string}` ? never : S
  : never;
