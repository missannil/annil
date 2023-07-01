import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { CustomEventsSign } from "../CustomEvents/SignForCustomEvents";

export type CustomEventMethods<O extends object> = {
  [k in keyof O]: IfExtends<
    Exclude<O[k], CustomEventsSign> & {},
    never,
    () => void,
    (detail: Exclude<O[k], CustomEventsSign>) => void
  >;
};
