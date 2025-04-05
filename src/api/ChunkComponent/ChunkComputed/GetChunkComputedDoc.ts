import type { ChunkComputedConstraint } from "./ChunkComputedConstraint";
/**
 * 获取computed字段文档类型
 * @param T - ComputedConstraint
 * @returns object
 */
export type GetChunkComputedDoc<TComputed extends ChunkComputedConstraint> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};
