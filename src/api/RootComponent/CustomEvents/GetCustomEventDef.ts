import type { DetailedType } from "../../../types/DetailedType";
import type { IfExtends } from "../../../types/IfExtends";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type {
  CustomEventConstraint,
  FullCustomEvents,
  ShortCustomEvents,
  SimpleCustomEventsList,
} from "./CustomEventConstraint";
import type { AddTagForCustomEventsDef } from "./CustomEventsTag";

export type GetShortCustomEventsDef<T extends ShortCustomEvents> = T extends DetailedType ? InferDetailedType<T>
  : T extends null ? null
  : T extends undefined ? undefined
  : T extends SimpleCustomEventsList ? GetShortCustomEventsDef<T[number]>
  : never;

export type GetFullCustomEventsDef<T extends FullCustomEvents> =
  | GetShortCustomEventsDef<T["detail"]>
  | IfExtends<unknown, T["options"], never, AddTagForCustomEventsDef<T["options"] & {}>>;

export type GetCustomEventsDef<T extends CustomEventConstraint> = {
  [k in keyof T]: T[k] extends ShortCustomEvents ? GetShortCustomEventsDef<T[k]>
    : T[k] extends FullCustomEvents ?
        | GetShortCustomEventsDef<T[k]["detail"]>
        // 为事件加上标签
        | IfExtends<unknown, T[k]["options"], never, AddTagForCustomEventsDef<NonNullable<T[k]["options"]>>>
    : never;
};
