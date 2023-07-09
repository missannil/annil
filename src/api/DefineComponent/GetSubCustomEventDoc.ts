import type { SubComponentDoc } from "../../common_types/SubComponentDoc";

/**
 * 为了减少实例化 采用Result & Head["customEvents"]交叉而不是联合相同key,所以有相同key会出现never的情况。
 */
type _GetSubCustomEventDoc<T, Result = {}> = T extends [
  infer Head extends SubComponentDoc,
  ...infer Rest extends SubComponentDoc[],
] ? _GetSubCustomEventDoc<Rest, Result & Head["customEvents"]>
  : Result;

export type GetSubCustomEventDoc<L> = _GetSubCustomEventDoc<L>;
