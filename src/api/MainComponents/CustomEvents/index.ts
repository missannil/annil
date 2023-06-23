import type { AnyObject, V } from "hry-types";
import type { IfEquals } from "hry-types/src/Any/IfEquals";
import { InstanceInject } from "../../InstanceInject";
import type { EventsConstraint } from "../Events.ts/EventsConstraint";
import type { CustomEventConstraint } from "./CustomEventConstraint";

export type CustomEvents<
  TCustomEvents extends CustomEventConstraint,
  TEventsDoc extends AnyObject,
> = {
  /**
   * 声明组件自定义事件
   * @example
   * ```ts
   * const customEvents = {
   *  customEventA: String, // "string"
   *  customEventB: [String as SpecificType<"male" | "femal">, Number], // "male" | "femal" | number
   *  customEventC: {
   *    detailType: String,
   *    options: {
   *      bubbles: true,
   *      composed: true ,//可选
   *      capturePhase: true,//可选
   *    },
   *  },
   * };
   * ```
   */
  customEvents?:
    & TCustomEvents
    & V.DuplicateFieldValidation<TCustomEvents, keyof InstanceInject["methods"] & {}, "与注入的methods字段重复">
    & V.IllegalFieldValidation<TCustomEvents, "bubbles" | "composed" | "capturePhase", 1, "options">
    & IfEquals<
      TEventsDoc,
      EventsConstraint,
      unknown,
      V.DuplicateFieldValidation<TCustomEvents, keyof TEventsDoc, "与events字段重复">
    >;
};
