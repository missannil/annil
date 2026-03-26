import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { CustomEventsTags } from "../CustomEvents/CustomEventsTag";

export type generateCustomEventMethods<TCustomEventsDef extends object> = {
  [k in keyof TCustomEventsDef]: IfExtends<
    Exclude<TCustomEventsDef[k], CustomEventsTags>,
    undefined,
    () => void,
    (detail: Exclude<TCustomEventsDef[k], CustomEventsTags>) => void
  >;
};
