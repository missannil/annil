import type { G } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Validators } from "../../../types/Validators";
import type { ChunkEventsConstraint } from "./ChunkEventsConstraint";

export type ChunkEventsOption<
  TEvents extends ChunkEventsConstraint,
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
        IfExtends<
          ChunkEventsConstraint,
          TEvents,
          unknown,
          IfExtends<Prefix, "", unknown, G.KeyValidator<TEvents, `${Prefix}_${string}`, "前缀错误">>
        >,
      ]
    >;
};
