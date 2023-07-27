import type { V } from "hry-types";
import type { CustomEventConstraint } from "./CustomEventConstraint";

/**
 * customEvents字段泛型输入
 */
export type CustomEventsOption<
  TCustomEvents extends CustomEventConstraint,
  DuplicateFieldCheck,
> = {
  /**
   * 自定义事件
   * @remarks 使用this.customEventsA 调用
   * @example
   * ```ts
   *  {
   *   // ...
   *   customEvents: {
   *     A: Number, // number
   *     B: [String as SpecificType<"male" | "femal">, Number], // "male" | "femal" | number
   *     C: {
   *       detailType: String,
   *       options: {
   *         bubbles: true,
   *         composed: true,
   *         capturePhase: true,
   *       },
   *     },
   *   },
   * };
   * ```
   */
  customEvents?:
    & TCustomEvents
    & V.IllegalFieldValidator<TCustomEvents, "bubbles" | "composed" | "capturePhase", 1, "options">
    & V.DuplicateFieldValidator<TCustomEvents, keyof DuplicateFieldCheck, "与events字段重复">;
};
