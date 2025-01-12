import type { G } from "hry-types";
import type { CustomEventConstraint } from "./CustomEventConstraint";

export type CustomEventsOption<
  TCustomEvents extends CustomEventConstraint,
  DuplicateFields extends PropertyKey,
> = {
  /**
   * customEvents 定义组件的自定义事件 [类型约束](CustomEventConstraint.ts)
   * @remarks 通过this.A(123)调用。与events字段重复检测
   * @example
   * ```ts
   * {
   *  customEvents: {
   *    A: Number, // number
   *    B: [String as DetailedType<"male" | "femal">, Number], // "male" | "femal" | number
   *    C: {
   *      detail: String,
   *      options: {
   *        bubbles: true,
   *        composed: true,
   *        capturePhase: true,
   *      },
   *    },
   *  },
   *  methods: {
   *    M1() {
   *      // 调用自定义事件
   *      this.A(123);
   *      this.B("femal");
   *      this.C("string");
   *    },
   *  },
   * },
   * ```
   */
  customEvents?:
    & TCustomEvents
    & G.IllegalFieldValidator<TCustomEvents, "bubbles" | "composed" | "capturePhase", 1, "options">
    & G.DuplicateFieldValidator<TCustomEvents, DuplicateFields, "字段重复">;
};
