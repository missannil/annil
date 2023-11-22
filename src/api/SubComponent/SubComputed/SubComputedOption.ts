import type { V } from "hry-types";
import type { ValidatorOfReturnType } from "../../../types/ValidatorOfReturnType";
import type { SubComputedConstraint } from "./SubComputedConstraint";

export type SubComputedOption<
  TComputed extends SubComputedConstraint,
  legal extends Record<PropertyKey, unknown>,
> = {
  computed?:
    & TComputed
    & V.IllegalFieldValidator<TComputed, keyof legal, 0, "", "重复或无效的字段">
    & ValidatorOfReturnType<TComputed, legal>;
};
