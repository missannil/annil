import type { V } from "hry-types";
import type { StoreConstraint } from "./StoreConstraint";

export type StoreOption<TStore extends StoreConstraint, TDuplicate extends object> = {
  store?:
    & TStore
    & V.DuplicateFieldValidator<TStore, keyof TDuplicate, "字段重复">;
};
