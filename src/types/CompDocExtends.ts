import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { ComponentDoc } from "../api/DefineComponent/ReturnType/ComponentDoc";
import type { UnionToComma } from "./UnionToComma.test";

type _Validator<
  T,
  ExistingKeys extends PropertyKey,
  DuplicateKeys extends PropertyKey = Extract<keyof T, ExistingKeys>,
> = [DuplicateKeys] extends [never] ? object : `重复的字段${UnionToComma<DuplicateKeys & string>}`;

export type CompDocExtends<
  TSubComp extends ComponentDoc,
  Ext extends _Validator<Ext, keyof (TSubComp["properties"])> = {},
> = ComputeIntersectionDeep<TSubComp & { properties: Ext }>;
