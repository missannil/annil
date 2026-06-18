import type { G } from "hry-types";

import type { SubMethodsConstraint } from "./SubMethodsConstraint";

export type SubMethodsOption<
  TMethods extends SubMethodsConstraint,
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
