import type { V } from "hry-types";

import type { MethodsConstraint } from "./MethodsConstraint";

export type MethodsOption<
  TMethods extends MethodsConstraint,
  DuplicateField extends PropertyKey,
> = {
  /**
   * 与customEvents和events字段重复检测
   */
  methods?:
    & TMethods
    & V.DuplicateFieldValidator<TMethods, DuplicateField>;
};
