import type { DuplicateFieldValidator } from "../../../types/DuplicateFieldValidator";

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
    & DuplicateFieldValidator<TMethods, DuplicateField>;
};
