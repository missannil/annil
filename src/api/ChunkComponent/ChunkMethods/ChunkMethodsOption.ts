import type { IfAllExtends } from "hry-types";
import type { DuplicateFieldValidator } from "../../../types/DuplicateFieldValidator";
import type { KeyValidator } from "../../../types/KeyValidator";
import type { Validators } from "../../../types/Validators";
import type { MethodsConstraint } from "../../RootComponent/Methods/MethodsConstraint";

export type ChunkMethodsOption<
  TMethods extends MethodsConstraint,
  TDuplicateKeys extends PropertyKey,
  Prefix extends string,
> = {
  /**
   * 与customEvents和events字段重复检测
   */
  methods?:
    & TMethods
    & Validators<
      [
        DuplicateFieldValidator<TMethods, TDuplicateKeys, "字段重复">,
        IfAllExtends<
          MethodsConstraint,
          TMethods,
          unknown,
          IfAllExtends<Prefix, "", unknown, KeyValidator<TMethods, `${Prefix}_${string}`, "前缀错误">>
        >,
      ]
    >;
};
