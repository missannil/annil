import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { MethodsConstraint } from "../Methods/MethodsConstraint";

/**
 * 获取MainComponent文档类型
 */
export type GetMainComponentDoc<
  PropertiesDoc extends AnyObject,
  DataDoc extends AnyObject,
  ComputedDoc extends AnyObject,
  EventsDoc extends AnyObject,
  CustomEventsDoc extends AnyObject,
  TMethods extends MethodsConstraint = {},
  TIsPage extends boolean = false,
> = MergeIntersection<
  & IfExtends<TIsPage, false, {}, { isPage: true }>
  & IfExtends<{}, PropertiesDoc, unknown, { properties: PropertiesDoc }>
  & IfExtends<
    {},
    DataDoc & PropertiesDoc & ComputedDoc,
    unknown,
    {
      allData: DataDoc & Required<PropertiesDoc> & ComputedDoc;
    }
  >
  & IfExtends<{}, TMethods, unknown, { methods: TMethods }>
  & IfEquals<{}, EventsDoc, unknown, { events: EventsDoc }>
  & IfExtends<
    {},
    CustomEventsDoc,
    unknown,
    { customEvents: CustomEventsDoc }
  >
>;
