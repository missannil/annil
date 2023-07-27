import type { V } from "hry-types";
import type { MainComponentDoc } from "../../../types/MainComponentDoc";
import type { Validators } from "../../../types/Validators";

export type SubEvents<TEvents extends object, TMainComponentDoc extends MainComponentDoc> = {
  events?:
    & TEvents
    & Validators<[
      V.DuplicateFieldValidator<
        TEvents,
        keyof (TMainComponentDoc["customEvents"] & TMainComponentDoc["events"] & TMainComponentDoc["methods"])
      >,
    ]>;
};
