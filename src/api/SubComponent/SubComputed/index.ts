import type { V } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { PrefixValidator } from "../../../types/PrefixValidator";
import type { Validators } from "../../../types/Validators";

type RemoveInnerKeys<T> = { [k in keyof T as k extends `_${string}` ? never : k]: T[k] };

export type SubComputed<
  TComputed extends object,
  Prefix extends string,
  ThisData extends object,
  PropertiesDoc extends object,
  SubComputedDoc,
> = {
  computed?:
    & TComputed
    & ThisType<{
      data: ComputeIntersection<ThisData & SubComputedDoc>;
    }>
    & Validators<[
      V.DuplicateFieldValidator<TComputed, keyof ThisData>,
      PrefixValidator<TComputed, Prefix | `_${Prefix}`>,
      IfExtends<
        {},
        PropertiesDoc,
        unknown,
        V.IllegalFieldValidator<RemoveInnerKeys<TComputed>, keyof PropertiesDoc>
      >,
    ]>;
};
