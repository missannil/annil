import type { DuplicateFieldValidator } from "../../../types/DuplicateFieldValidator";
import type { Validators } from "../../../types/Validators";
import type { ValidatorPrefix } from "./validatePrefix";

export type ChunkDataOption<TData extends object, TDuplicateKeys extends PropertyKey, Prefix extends string> = {
  /**
   * slot块数据
   */
  data?:
    & TData
    & Validators<
      [
        DuplicateFieldValidator<TData, TDuplicateKeys, "字段重复">,
        ValidatorPrefix<TData, Prefix>,
      ]
    >;
};
