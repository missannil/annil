import type { IfExtends, IsNever } from "hry-types/src/Any/_api";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentDoc } from "../../../types/ComponentDoc";
import type { WMCustomEvent } from "../../../types/officialAlias";
import type { CustomEventsSign } from "../../MainComponent/CustomEvents/SignForCustomEvents";
import type { EventsConstraint } from "../../MainComponent/Events/EventsConstraint";
export type CustomEventDocToEventsConstraint<TCustomEventsDoc extends object> = {
  [k in keyof TCustomEventsDoc]?: (
    e: IfExtends<
      IsNever<TCustomEventsDoc[k]>,
      true,
      WMCustomEvent<unknown>,
      WMCustomEvent<Exclude<TCustomEventsDoc[k], CustomEventsSign>>
    >,
  ) => void;
};

/**
 * events字段约束
 * @returns
 * 1. ComponentDoc为 `{}`时 EventsConstraint
 * 2. TComponentDoc["customEvents"]为unknown时 返回 EmptyObject
 * 3. TComponentDoc["customEvents"]不为unknown时 返回 `CustomEventDocToEventsConstraint<TComponentDoc["customEvents"] & {}>`
 */
export type SubEventsConstraint<TComponentDoc extends ComponentDoc> = IfExtends<
  {},
  TComponentDoc,
  EventsConstraint,
  IfExtends<
    unknown,
    TComponentDoc["customEvents"],
    EmptyObject,
    CustomEventDocToEventsConstraint<TComponentDoc["customEvents"] & {}>
  >
>;
