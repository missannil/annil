import type { Equals } from "hry-types/src/Any/_api";

export type ParamsEqual<A, B extends Equals<A, B> extends true ? unknown : never> = true;
