import type { SubComputedConstraint } from "./SubComputedConstraint";

export type GetSubComputedDoc<TComputed extends SubComputedConstraint> = {
  // @ts-ignore TComputed[k] 必为函数
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};