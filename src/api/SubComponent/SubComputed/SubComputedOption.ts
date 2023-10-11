import type { V } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { SubComputedConstraint } from "./SubComputedConstraint";

export type SubComputedOption<
  TComputed extends SubComputedConstraint,
  TThisData extends object,
  legalOption extends object,
> = {
  computed?:
    & TComputed
    & ThisType<{ data: ReadonlyDeep<ComputeIntersection<TThisData>> }>
    & V.IllegalFieldValidator<TComputed, keyof legalOption, 0, "", "重复或无效的字段">;
  // & ValidatorOfReturnType<TComputed, legalOption>;
};
