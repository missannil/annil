import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComputeIntersection, Select } from "hry-types/src/Object/_api";
import type { RemovePrefix } from "../../../types/RemovePrefix";
import type { UnionToComma } from "../../../types/UnionToComma.test";
import type { Composed } from "../../RootComponent/CustomEvents/CustomEventsTag";

type SelectStopEvents<T extends object> = {
  [k in keyof T as k extends `${infer R}_catch` ? R : never]: unknown;
};

type GetComposedEvents<
  TCustomEventsDoc extends object,
> = Select<
  TCustomEventsDoc,
  Composed,
  "contains->"
>;

export type CreateSubComponentDoc<
  OriginalCompDoc extends object,
  SubEventsDoc extends object,
  MissingRequiredField extends PropertyKey,
  SubCompDoc = ComputeIntersection<
    RemovePrefix<
      Omit<
        GetComposedEvents<OriginalCompDoc>,
        keyof SelectStopEvents<SubEventsDoc>
      >
    >
  >,
> = IfExtends<
  MissingRequiredField,
  never,
  IfExtends<EmptyObject, SubCompDoc, never, SubCompDoc>,
  `缺少必传的字段${UnionToComma<MissingRequiredField & string>}`
>;
