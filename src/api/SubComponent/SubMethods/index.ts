import type { V } from "hry-types";
import type { PrefixValidator } from "../../../types/PrefixValidator";

export type SubMethods<TSubMethods extends object, TPrefix extends string, TKeys extends PropertyKey> = {
  methods?:
    & TSubMethods
    & PrefixValidator<TSubMethods, TPrefix>
    & V.DuplicateFieldValidator<TSubMethods, TKeys>;
};
