import type { IfExtends } from "hry-types";

export type DuplicateFieldValidation<
  Original extends object,
  Compared extends object,
  Prompt extends string,
> = IfExtends<{}, Original, unknown, Record<Extract<keyof Original, keyof Compared>, Prompt>>;

// ⚠️
