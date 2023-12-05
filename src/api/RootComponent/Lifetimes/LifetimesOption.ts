import type { LifetimesConstraint } from "./LifetimesConstraint";

export type LifetimesOption<TIsPage extends boolean> = TIsPage extends false // 组件开通lifetimes字段
  ? {
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
  }
  // 页面关闭lifetimes字段(其实也可以开启)
  : unknown;
