import type { IllegalFieldValidator } from "./IllegalFieldValidator";

export type KeyValidator<
  T extends object,
  LegalKeys extends PropertyKey,
  ErrMsg extends string = "字段错误",
> = IllegalFieldValidator<T, LegalKeys, 0, "", ErrMsg>;
