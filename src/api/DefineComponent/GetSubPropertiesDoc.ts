import type { SubComponentDoc } from "../../common_types/SubComponentDoc";

type _GetSubPropertiesDoc<T extends SubComponentDoc[], Result = {}> = T extends [
  infer Head extends SubComponentDoc,
  ...infer Rest extends SubComponentDoc[],
] ? _GetSubPropertiesDoc<Rest, Result & Head["properties"]>
  : Result;

export type GetSubPropertiesDoc<T extends SubComponentDoc[]> = _GetSubPropertiesDoc<T>;
