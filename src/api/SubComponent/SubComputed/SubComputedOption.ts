import type { G } from "hry-types";
export type SubComputedOption<
  TComputed extends object,
  legal extends PropertyKey,
> = {
  computed?:
    & TComputed
    & G.IllegalFieldValidator<TComputed, legal, 0, "", "重复或无效的字段">;
};
