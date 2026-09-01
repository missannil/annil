import type { _Select, EmptyObject } from "hry-types";

import type { _SimplifyIntersection } from "hry-types";
import type { IfExtends } from "../../../types/IfExtends";
import type { RemovePrefix } from "../../../types/RemovePrefix";
import type { Composed } from "../../RootComponent/CustomEvents/CustomEventsTag";

type SelectStopEvents<T extends object> = {
  [k in keyof T as k extends `${infer R}_catch` ? R : never]: unknown;
};

type GetComposedEvents<
  TCustomEventsDoc extends object,
> = _Select<TCustomEventsDoc, Composed, "someExtends->">;

export type CreateCustomComponentDoc<
  ComponentCustomEvents extends object,
  EventsDoc extends object,
  ComposedEvents extends object = _SimplifyIntersection<
    RemovePrefix<
      Omit<
        GetComposedEvents<ComponentCustomEvents>,
        keyof SelectStopEvents<EventsDoc>
      >
    >
  >,
  CustomCompDoc = _SimplifyIntersection<
    // 1. 从原始组件文档中排除子组件文档中的事件
    IfExtends<EmptyObject, ComposedEvents, {}, { composedEvents: ComposedEvents }>
  >,
> = IfExtends<EmptyObject, CustomCompDoc, never, CustomCompDoc>;
