import type { V } from "hry-types";
export type SubComputedOption<
  TComputed extends object,
  legal extends PropertyKey,
> = {
  computed?:
    & TComputed
    & V.IllegalFieldValidator<TComputed, legal, 0, "", "重复或无效的字段">;
};
