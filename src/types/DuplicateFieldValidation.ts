import type { IfExtends } from "hry-types";

export type DuplicateFieldValidation<
  Original extends object,
  ComparedKeys extends string,
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
