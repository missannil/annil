import type { G } from "hry-types";

import type { SubMethodsConstraint } from "./SubMethodsConstraint";

export type SubMethodsOption<
  TSubMethods extends SubMethodsConstraint,
  TPrefix extends string,
  ExcludedKeys extends PropertyKey,
> = {
  /**
   * 前缀检测和重复检测(与events和组件customEvents字段)
   */
  methods?:
    & TSubMethods
    & G.KeyValidator<TSubMethods, `${TPrefix}_${string}`>
    & G.DuplicateFieldValidator<TSubMethods, ExcludedKeys>;
};
