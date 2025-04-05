import type { G } from "hry-types";
import type { DuplicateFieldValidator } from "hry-types/src/Generic/DuplicateFieldValidator";
import type { ChunkComputedConstraint } from "./ChunkComputedConstraint";
export type ChunkComputedOption<
  TComputed extends ChunkComputedConstraint,
  CompareKeys extends PropertyKey,
  Instance extends object,
  TPrefix extends string,
> = {
  /**
   * computed字段, [类型约束ComputedConstraint](ComputedConstraint.ts)
   * @remarks
   *
   * 函数体内,可通过this.data获取实例其他数据(依赖),setData发生时,若数据(依赖)发生变化则重新运行函数体并setData。
   *
   * 带重复字段检测(与properties、data、store字段比较)
   *
   * @example
   *
   * ```ts
   * {
   *  data:{
   *     count:1
   *  },
   *  computed:{
   *     return this.data.count + 1
   *  }

   * }
   *
   * ```
   */
  computed?:
    & TComputed
    & ThisType<Instance>
    & DuplicateFieldValidator<TComputed, CompareKeys>
    & G.KeyValidator<TComputed, `${TPrefix}_${string}` | `_${TPrefix}_${string}`>;
};
