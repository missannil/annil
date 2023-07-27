import type { V } from "hry-types";

export type SubDataOption<TSubData extends object, legalKeys extends PropertyKey, TPrefix extends string> = {
  data?:
    & TSubData
    & V.IllegalFieldValidator<
      TSubData,
      legalKeys | `_${TPrefix}_${string}`,
      0,
      "",
      "⚠️ 子组件无需此字段或与Inherit字段重复 ⚠️"
    >;
};
