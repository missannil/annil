import type { IfAllExtends } from "hry-types";
import type { DuplicateFieldValidator } from "../../../types/DuplicateFieldValidator";
import type { KeyValidator } from "../../../types/KeyValidator";
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
        DuplicateFieldValidator<TEvents, TDuplicateKeys, "字段重复">,
        IfAllExtends<
          ChunkEventsConstraint,
          TEvents,
          unknown,
          IfAllExtends<Prefix, "", unknown, KeyValidator<TEvents, `${Prefix}_${string}`, "前缀错误">>
        >,
      ]
    >;
};
