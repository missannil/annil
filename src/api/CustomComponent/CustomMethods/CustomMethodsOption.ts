import type { G } from "hry-types";

import type { CustomMethodsConstraint } from "./CustomMethodsConstraint";

export type CustomMethodsOption<
  TMethods extends CustomMethodsConstraint,
  TPrefix extends string,
  ExcludedKeys extends PropertyKey,
> = {
  /**
   * 前缀检测和重复检测(与events和组件customEvents字段)
   */
  methods?:
    & TMethods
    & G.KeyValidator<TMethods, `${TPrefix}_${string}`>
    & G.DuplicateFieldValidator<TMethods, ExcludedKeys>;
};
