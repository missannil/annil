import type { Func } from "hry-types";

type IllegalFieldError<T, ErrMsg extends string> = T extends Func ? `⚠️${ErrMsg}⚠️` : () => `⚠️${ErrMsg}⚠️`;

type IllegalFieldMap<T extends object, LegalKeys extends PropertyKey, ErrMsg extends string> = {
  [K in keyof T as K extends LegalKeys ? never : K]: IllegalFieldError<T[K], ErrMsg>;
};

type NestedIllegalFieldMap<
  T extends object,
  LegalKeys extends PropertyKey,
  Path extends PropertyKey,
  ErrMsg extends string,
> = {
  [K in keyof T]: T[K] extends object
    ? Path extends keyof T[K] ? T[K][Path] extends object ? Record<Path, IllegalFieldMap<T[K][Path], LegalKeys, ErrMsg>>
      : unknown
    : unknown
    : unknown;
};

export type IllegalFieldValidator<
  T extends object,
  LegalKeys extends PropertyKey,
  Level extends 0 | 1 = 0,
  Path extends PropertyKey = "",
  ErrMsg extends string = "字段错误",
> = Level extends 1 ? NestedIllegalFieldMap<T, LegalKeys, Path, ErrMsg>
  : IllegalFieldMap<T, LegalKeys, ErrMsg>;
