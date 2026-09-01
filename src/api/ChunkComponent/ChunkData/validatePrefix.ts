import type { KeyValidator } from "../../../types/KeyValidator";

export type ValidatorPrefix<TData extends object, Prefix extends string> = Prefix extends "" ? unknown
  : KeyValidator<TData, `_${Prefix}_${string}` | `${Prefix}_${string}`, "前缀错误">;
