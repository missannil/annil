import type { Primitive } from "hry-types";
import type { CustomEventsTags } from "./CustomEventsTag";

export type CustomEventsDef = Record<string, Exclude<Primitive, undefined> | object | CustomEventsTags>;
