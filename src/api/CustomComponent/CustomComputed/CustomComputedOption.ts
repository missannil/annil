import type { KeyValidator } from "../../../types/KeyValidator";
export type CustomComputedOption<
  TComputed extends object,
  legal extends PropertyKey,
> // Instance extends object,
 = {
  computed?:
    & TComputed
    // & ThisType<Instance>
    & KeyValidator<TComputed, legal, "重复或无效的字段">;
};
