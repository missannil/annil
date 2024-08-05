/* eslint-disable @typescript-eslint/no-explicit-any */
type PrefixKeys = `${string}_${string}`;

type _ComponentDoc = {
  properties?: Record<PrefixKeys, any>;
  customEvents?: Record<PrefixKeys, any>;
};

type Error = "{ properties?: Record<PrefixKeys, any>; customEvents?: Record<PrefixKeys, any>;}";

type _Validator<O> = keyof O extends keyof _ComponentDoc
  // @ts-ignore 要求ComponentDoc有前缀
  ? keyof (O["properties"] & O["customEvents"]) extends PrefixKeys ? _ComponentDoc
  : Error
  : Error;

/**
 * RootComponent Api 返回的类型
 * ```ts
 * RootComponentDoc = {
 * properties?: Record<PrefixKeys, any>;
 * customEvents?: Record<PrefixKeys, any>;
 * };
 * ```
 */
export type ComponentDoc<O extends _Validator<O> = _ComponentDoc> = O;
