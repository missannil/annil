import type { IfExtends } from "hry-types/src/Any/IfExtends";

export type DuplicateFieldValidation<
  Original extends object,
  ComparedKeys extends PropertyKey,
  Prompt extends string,
  DuplicateKeys extends keyof Original = Extract<keyof Original, ComparedKeys>,
> = IfExtends<
  {},
  Original,
  unknown,
  IfExtends<
    DuplicateKeys,
    never,
    unknown,
    { [k in DuplicateKeys]: Original[k] extends AnyFunction ? `⚠️${Prompt}⚠️` : () => `⚠️${Prompt}⚠️` }
  >
>;
