import type { IfEquals, KeysValidator } from "hry-types";

type DuplicateFieldValidatorImpl<
  G extends object,
  Compared extends PropertyKey,
  Message extends string,
  DuplicateKeys extends keyof G = Extract<keyof G, Compared>,
> = IfEquals<
  DuplicateKeys,
  never,
  unknown,
  KeysValidator<G, DuplicateKeys, "deny", Message>
>;

export type DuplicateFieldValidator<
  G extends object,
  Compared extends PropertyKey,
  Message extends string = "字段重复",
> = DuplicateFieldValidatorImpl<G, Compared, Message>;
