import type { SubComputedConstraint } from "../api/SubComponent/SubComputed/SubComputedConstraint";

/**
 * 返回类型验证
 */
export type ValidatorOfReturnType<TComputed extends SubComputedConstraint, TCompare> = {
  [
    k in keyof TComputed as k extends keyof TCompare // @ts-ignore TComputed[k]必为函数
      ? ReturnType<TComputed[k]> extends TCompare[k] ? never
      : k
      : never
  ]: k extends keyof TCompare ? () => TCompare[k] : never;
};
