import type { Primitive } from "hry-types/src/_internal/Primitive";
import type { CustomEventsTags } from "./CustomEventsTag";

export type CustomEventsDoc = { [k in string]: Exclude<Primitive, undefined> | object | CustomEventsTags };
