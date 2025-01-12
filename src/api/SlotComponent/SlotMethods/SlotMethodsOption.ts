import type { G } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/_api";
import type { Validators } from "../../../types/Validators";
import type { MethodsConstraint } from "../../RootComponent/Methods/MethodsConstraint";

export type SlotMethodsOption<
  TMethods extends MethodsConstraint,
  TDuplicateKeys extends PropertyKey,
  validityKeys extends string,
> = {
  /**
   * 与customEvents和events字段重复检测
   */
  methods?:
    & TMethods
    & Validators<
      [
        G.DuplicateFieldValidator<TMethods, TDuplicateKeys, "字段重复">,
        IfExtends<MethodsConstraint, TMethods, unknown, G.KeyValidator<TMethods, validityKeys, "前缀错误">>,
      ]
    >;
};
