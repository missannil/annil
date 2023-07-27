import type { SubComponentDoc } from "../api/SubComponent/SubComponentDoc";

// 获取元组中properties字段的重复keys
export type GetPropertiesDuplicatedKeys<
  O extends SubComponentDoc[],
  Comparekeys extends PropertyKey,
  Duplicatekey extends string = never,
> = O extends [infer Head extends SubComponentDoc, ...infer Rest extends SubComponentDoc[]]
  ? GetPropertiesDuplicatedKeys<
    Rest,
    Comparekeys | keyof Head["properties"],
    Extract<Comparekeys, keyof Head["properties"]> & string | Duplicatekey
  >
  : Duplicatekey;
