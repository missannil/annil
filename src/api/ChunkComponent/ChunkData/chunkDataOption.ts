import type { G } from "hry-types";
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
        G.DuplicateFieldValidator<TData, TDuplicateKeys, "字段重复">,
        ValidatorPrefix<TData, Prefix>,
      ]
    >;
};
