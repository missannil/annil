import type { SubComponentType } from "../api/SubComponent/SubComponentType";

// 获取元组中properties字段的重复keys
export type GetPropertiesDuplicatedKeys<
  O extends SubComponentType[],
  Comparekeys extends PropertyKey,
  Duplicatekey extends string = never,
> = O extends [infer Head extends SubComponentType, ...infer Rest extends SubComponentType[]]
  ? GetPropertiesDuplicatedKeys<
    Rest,
    Comparekeys | keyof Head["properties"],
    Extract<Comparekeys, keyof Head["properties"]> & string | Duplicatekey
  >
  : Duplicatekey;
