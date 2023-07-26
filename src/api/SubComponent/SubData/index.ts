import type { V } from "hry-types";
import type { PrefixValidator } from "../../../types/PrefixValidator";
import type { Validators } from "../../../types/Validators";

export type SubData<TSubData extends object, CurrentPrefix extends string, ComparedKeys extends PropertyKey> = {
  data?:
    & TSubData
    & Validators<[
      V.DuplicateFieldValidator<TSubData, ComparedKeys>,
      PrefixValidator<TSubData, CurrentPrefix | `_${CurrentPrefix}`>,
    ]>;
};
