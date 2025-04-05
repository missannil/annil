import type { KeyValidator } from "hry-types/src/Generic/_api";

export type ValidatorPrefix<TData extends object, Prefix extends string> = Prefix extends "" ? unknown
  : KeyValidator<TData, `_${Prefix}_${string}` | `${Prefix}_${string}`, "前缀错误">;
