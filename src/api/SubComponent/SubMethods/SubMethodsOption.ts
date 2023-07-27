import type { V } from "hry-types";
import type { PrefixValidator } from "hry-types/src/Generic/PrefixValidator";

export type SubMethodsOption<
  TSubMethods extends object,
  TPrefix extends string,
  CompCustomEventsKeys extends PropertyKey,
> = {
  methods?:
    & TSubMethods
    & PrefixValidator<TSubMethods, TPrefix>
    & V.DuplicateFieldValidator<TSubMethods, CompCustomEventsKeys>;
};
