import type { Primitive } from "hry-types/src/_internal/Primitive";
import type { CustomEventsTags } from "./CustomEventsTag";

export type CustomEventsDoc = Record<string, Exclude<Primitive, undefined> | object | CustomEventsTags>;
