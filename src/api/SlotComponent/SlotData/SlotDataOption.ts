import type { G } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Validators } from "../../../types/Validators";
import type { SlotEventsConstraint } from "../SlotEvents/SlotEventsConstraint";

export type SlotDataOption<TData extends object, TDuplicateKeys extends PropertyKey, Prefix extends string> = {
  /**
   * slot块数据
   */
  data?:
    & TData
    & Validators<
      [
        G.DuplicateFieldValidator<TData, TDuplicateKeys, "字段重复">,
        IfExtends<SlotEventsConstraint, TData, unknown, G.KeyValidator<TData, Prefix, "前缀错误">>,
      ]
    >;
};
