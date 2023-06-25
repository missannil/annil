import type { AnyObject, V } from "hry-types";
import { InstanceInject } from "../../InstanceInject";
import type { CustomEventConstraint } from "./CustomEventConstraint";

/**
 * @description 自定义事件字段输入泛型
 * @returns TCustomEvents
 */
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
   *      composed: true ,
   *      capturePhase: true,
   *    },
   *  },
   * };
   * ```
   */
  customEvents?:
    & TCustomEvents
    & V.DuplicateFieldValidation<TCustomEvents, keyof InstanceInject["methods"] & {}, "与注入的methods字段重复">
    & V.IllegalFieldValidation<TCustomEvents, "bubbles" | "composed" | "capturePhase", 1, "options">
    & V.DuplicateFieldValidation<TCustomEvents, keyof TEventsDoc, "与events字段重复">;
};
