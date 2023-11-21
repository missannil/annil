import type { V } from "hry-types";

export type SubStateOption<TSubState extends object, legalKeys extends PropertyKey, TPrefix extends string> = {
  state?:
    & TSubState
    & V.IllegalFieldValidator<
      TSubState,
      legalKeys | `_${TPrefix}_${string}`,
      0,
      "",
      "⚠️ 子组件无需此字段或为字段重复 ⚠️"
    >;
};
