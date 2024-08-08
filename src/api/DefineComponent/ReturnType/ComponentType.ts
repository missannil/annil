type PrefixKeys = `${string}_${string}`;

type _ComponentType = {
  properties?: Record<PrefixKeys, unknown>;
  customEvents?: Record<PrefixKeys, unknown>;
};

type Error = "{ properties?: Record<PrefixKeys, any>; customEvents?: Record<PrefixKeys, any>;}";

type _Validator<O> = keyof O extends keyof _ComponentType
  // @ts-ignore 要求ComponentDoc有前缀
  ? keyof (O["properties"] & O["customEvents"]) extends PrefixKeys ? _ComponentType
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
export type ComponentType<O extends _Validator<O> = _ComponentType> = O;
