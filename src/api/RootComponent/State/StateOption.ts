import type { V } from "hry-types";
import type { StateConstraint } from "./StateConstraint";

export type StateOption<TState extends StateConstraint, TDuplicate extends object> = {
  state?:
    & TState
    & V.DuplicateFieldValidator<TState, keyof TDuplicate, "字段重复">;
};
