import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { CustomEventsTags } from "../CustomEvents/CustomEventsTag";

export type CustomEventMethods<O extends object> = {
  [k in keyof O]: IfExtends<
    Exclude<O[k], CustomEventsTags> & {},
    never,
    () => void,
    (detail: Exclude<O[k], CustomEventsTags>) => void
  >;
};
