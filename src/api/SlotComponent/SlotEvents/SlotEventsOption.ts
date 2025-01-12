import type { G } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Validators } from "../../../types/Validators";
import type { SlotEventsConstraint } from "./SlotEventsConstraint";

export type SlotEventsOption<
  TEvents extends SlotEventsConstraint,
  TDuplicateKeys extends PropertyKey,
  Prefix extends string,
> = {
  /**
   * slot块数据
   */
  events?:
    & TEvents
    & Validators<
      [
        G.DuplicateFieldValidator<TEvents, TDuplicateKeys, "字段重复">,
        IfExtends<SlotEventsConstraint, TEvents, unknown, G.KeyValidator<TEvents, Prefix, "前缀错误">>,
      ]
    >;
};
