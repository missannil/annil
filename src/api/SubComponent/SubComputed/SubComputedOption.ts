import type { G } from "hry-types";
export type SubComputedOption<
  TComputed extends object,
  legal extends PropertyKey,
  Instance extends object,
> = {
  computed?:
    & TComputed
    & ThisType<Instance>
    & G.IllegalFieldValidator<TComputed, legal, 0, "", "重复或无效的字段">;
};
