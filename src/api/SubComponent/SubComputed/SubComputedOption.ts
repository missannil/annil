import type { V } from "hry-types";
export type SubComputedOption<
  TComputed extends object,
  legal extends Record<PropertyKey, unknown>,
> = {
  computed?:
    & TComputed
    & V.IllegalFieldValidator<TComputed, keyof legal, 0, "", "重复或无效的字段">;
  // & ValidatorOfReturnType<TComputed, legal>;
};
