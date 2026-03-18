type PrefixKey = `${string}_${string}`;

type _ComponentDoc = {
  properties?: Record<PrefixKey, unknown>;
  customEvents?: Record<PrefixKey, unknown>;
};

type Error = "{ properties?: Record<PrefixKey, any>; customEvents?: Record<PrefixKey, any>;}";

type _Validator<O> = keyof O extends keyof _ComponentDoc
  // @ts-ignore 要求ComponentDoc有前缀
  ? keyof (O["properties"] & O["customEvents"]) extends PrefixKey ? _ComponentDoc
  : Error
  : Error;

/**
 * 组件文档类型
 * ```ts
 * type XxxDoc = {
 *  properties?: Record<PrefixKey, unknown>;
 *  customEvents?: Record<PrefixKey, unknown>;
};
 * ```
 */
export type ComponentDoc<O extends _Validator<O> = _ComponentDoc> = O;
