import type { V } from "hry-types";
import type { CustomEventConstraint } from "./CustomEventConstraint";

/**
 * 自定义事件字段输入泛型
 * @returns TCustomEvents
 */
export type CustomEvents<
  TCustomEvents extends CustomEventConstraint,
  DuplicateFieldCheck extends object,
> = {
  /**
   * 声明组件自定义事件
   * @example
   * ```ts
   * const customEvents = {
   *  customEventA: Number, // "number"
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
    & V.IllegalFieldValidator<TCustomEvents, "bubbles" | "composed" | "capturePhase", 1, "options">
    & V.DuplicateFieldValidator<TCustomEvents, keyof DuplicateFieldCheck, "与events字段重复">;
};
