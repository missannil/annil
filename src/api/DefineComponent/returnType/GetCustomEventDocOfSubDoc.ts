import type { _ExtractUnionMember, _MergeUnion, IsNever, IsUnion } from "hry-types";
import type { Assert } from "../../../types/Assert";
import type { CustomComponentDefinition } from "../../CustomComponent/returnType";

/**
 * 因为子组件文档customEvents字段有可能相同(无前缀),所以使用MergeUnion
 * 由于CustomComponentDoc为空时返回never而不`{}`,所以`Exclude<U, TLast>`不影响结果。
 */
type _GetCustomEventDocOfSubDoc<
  U extends CustomComponentDefinition,
  Result = {},
  TLast extends CustomComponentDefinition = Assert<_ExtractUnionMember<U>, CustomComponentDefinition>,
> = IsNever<U> extends true ? Result
  : _GetCustomEventDocOfSubDoc<Exclude<U, TLast>, _MergeUnion<Result, TLast["composedEvents"]>>;

/**
 * 获取子组件自定义事件文档
 * @remarks U 中 相同字段类型联合,所以使用元组推导不如ExtractUnionMember性能好。
 */
export type GetCustomEventDocOfSubDoc<UnionSubDoc extends CustomComponentDefinition> = [UnionSubDoc] extends [never]
  ? {}
  : IsUnion<UnionSubDoc> extends true ? _GetCustomEventDocOfSubDoc<UnionSubDoc>
  : UnionSubDoc["composedEvents"];
