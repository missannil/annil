import type { RequiredKeys } from "hry-types/src/Object/RequiredKeys";

/**
 * 去除对象中非可选字段类型中的null
 */
export type RemoveNullOfRequired<T extends object, RequireKeys extends keyof T = RequiredKeys<T>> = {
  [k in keyof T]: k extends RequireKeys ? Exclude<T[k], null> : T[k];
};
