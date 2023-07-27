import type { SubComputedConstraint } from "./SubComputedConstraint";

export type GetSubComputedDoc<TComputed extends SubComputedConstraint> = {
  [k in keyof TComputed]: ReturnType<TComputed[k]>;
};
