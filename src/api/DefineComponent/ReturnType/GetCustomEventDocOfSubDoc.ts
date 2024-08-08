import type { IsNever, IsUnion } from "hry-types/src/Any/_api";
import type { UnionTwoObject } from "hry-types/src/Object/UnionTwoObject";
import type { Last } from "hry-types/src/Union/Last";
import type { SubComponentType } from "../../SubComponent/SubComponentType";

/**
 * 因为子组件文档customEvents字段有可能相同(无前缀),所以使用UnionTwoObject
 * 由于SubComponentDoc为空时返回never而不`{}`,所以`Exclude<U, TLast>`不影响结果。
 */
type _GetCustomEventDocOfSubDoc<U extends SubComponentType, Result = {}, TLast = Last<U>> = IsNever<U> extends true
  ? Result
  : _GetCustomEventDocOfSubDoc<Exclude<U, TLast>, UnionTwoObject<Result, TLast>>;

/**
 * 获取子组件自定义事件文档
 * @remarks U 中 相同字段类型联合,所以使用元组推导不如Last性能好。
 */
export type GetCustomEventDocOfSubDoc<UnionSubDoc extends SubComponentType> = IsUnion<UnionSubDoc> extends true
  ? _GetCustomEventDocOfSubDoc<UnionSubDoc>
  : UnionSubDoc;
