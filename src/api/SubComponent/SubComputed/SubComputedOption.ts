import type { V } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { ValidatorOfReturnType } from "../../../types/ValidatorOfReturnType";
import type { SubComputedConstraint } from "./SubComputedConstraint";

export type SubComputedOption<
  TComputed extends SubComputedConstraint,
  OtherData extends object,
  legal extends Record<PropertyKey, unknown>,
> = {
  computed?:
    & TComputed
    & ThisType<{ data: ReadonlyDeep<ComputeIntersection<OtherData>> }>
    & V.IllegalFieldValidator<TComputed, keyof legal, 0, "", "重复或无效的字段">
    & ValidatorOfReturnType<TComputed, legal>;
};
