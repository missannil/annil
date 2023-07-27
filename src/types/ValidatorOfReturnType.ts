import type { SubComputedConstraint } from "../api/SubComponent/SubComputed/SubComputedConstraint";

/**
 * 返回类型验证
 */
export type ValidatorOfReturnType<
  TComputed extends SubComputedConstraint,
  TCompare extends Record<PropertyKey, unknown>,
> = {
  [
    k in keyof TComputed as ReturnType<TComputed[k]> extends TCompare[k] ? never
      : k
  ]: k extends keyof TCompare ? () => TCompare[k] : never;
};
