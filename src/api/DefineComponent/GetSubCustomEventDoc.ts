import type { O } from "hry-types";
import type { SubComponentDoc } from "../../common_types/SubComponentDoc";

type _GetSubCustomEventDoc<T, Result = {}> = T extends [
  infer Head extends SubComponentDoc,
  ...infer Rest extends SubComponentDoc[],
] ? _GetSubCustomEventDoc<Rest, O.UnionOf<Result, Head["customEvents"]>>
  : Result;

export type GetSubCustomEventDoc<L> = _GetSubCustomEventDoc<L>;
