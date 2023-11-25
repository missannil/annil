import type { SubComponentDoc } from "../../SubComponent/SubComponentDoc";

// 获取元组中所有SubComponentDoc的properties字段类型。这里忽略相同key的情况,结果为各个properties对象交叉类型。因为DefinComopnent API 在获取 SubComponentDoc字段类型时做了相同字段类型报错。
export type GetPropertiesDocOfSubDoc<Tuple extends SubComponentDoc[], Result = unknown> = Tuple extends
  [infer Head extends SubComponentDoc, ...infer Rest extends SubComponentDoc[]]
  ? GetPropertiesDocOfSubDoc<Rest, Result & Head["properties"]>
  : Result;
