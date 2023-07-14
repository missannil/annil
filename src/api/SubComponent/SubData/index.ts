import type { V } from "hry-types";
import type { PrefixValidator } from "../../../common_types/PrefixValidator";

export type SubData<TSubData extends object, CurrentPrefix extends string, ComparedKeys extends PropertyKey> = {
  data?:
    & TSubData
    & V.DuplicateFieldValidator<TSubData, ComparedKeys>
    & PrefixValidator<TSubData, CurrentPrefix | `_${CurrentPrefix}`>;
};
