import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Or } from "hry-types/src/List/Or";
import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { CustomEventConstraint } from "../CustomEvents/CustomEventConstraint";
import type { GetCustomEventDoc } from "../CustomEvents/GetCustomEventDoc";
import type { EventsConstraint } from "../Events.ts/EventsConstraint";
import type { MethodsConstraint } from "../Methods/MethodsConstraint";

/**
 * 获取MainComponent文档类型
 */
export type GetMainComponentDoc<
  TPropertiesDoc,
  TDataDoc,
  TComputedDoc,
  TEvents extends EventsConstraint,
  TCustomEvents extends CustomEventConstraint,
  TMethods extends MethodsConstraint,
  TIsPage extends boolean,
> = MergeIntersection<
  & IfExtends<TIsPage, false, {}, { isPage: true }>
  & IfExtends<unknown, TPropertiesDoc, unknown, { properties: TPropertiesDoc }>
  & IfExtends<
    unknown,
    TDataDoc & TPropertiesDoc & TComputedDoc,
    unknown,
    {
      allData: TDataDoc & Required<TPropertiesDoc> & TComputedDoc;
    }
  >
  & IfExtends<{}, TMethods, unknown, { methods: TMethods }>
  & IfEquals<TEvents, Or<[EventsConstraint, {}]>, unknown, { events: TEvents }>
  & IfExtends<
    {},
    TCustomEvents,
    unknown,
    { customEvents: GetCustomEventDoc<TCustomEvents> }
  >
>;
