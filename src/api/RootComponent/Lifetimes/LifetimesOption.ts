import type { LifetimesConstraint } from "./LifetimesConstraint";

export type LifetimesOption = {
  /**
   * 在原生类型上增加了beforeCreate周期
   * @example
   * ```ts
   * RootComponent()({
   *  lifetimes: {
   *    beforeCreate(opitons) {
   *      opitons;//为最终进入Component的配置对象
   *    },
   *    created() {
   *    },
   *    attached() {
   *    },
   *    ready() {
   *    },
   *    detached() {
   *    },
   *    error(err) {
   *      err.cause;
   *    },
   *    moved() {
   *    },
   *  },
   * });
   * ```
   */
  lifetimes?: LifetimesConstraint;
};
