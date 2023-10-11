import type { V } from "hry-types";

import type { MethodsConstraint } from "./MethodsConstraint";

export type MethodsOption<
  TMethods extends MethodsConstraint,
  DuplicateField extends PropertyKey,
> = {
  methods?:
    & TMethods
    & V.DuplicateFieldValidator<TMethods, DuplicateField>;
};
