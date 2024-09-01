import type { FinalOptionsOfComponent } from "../api/DefineComponent/normalizeOptions";

/**
 * 增加beforeCreate生命周期函数,便于测试
 */
export const BBeforeCreate = Behavior({
  // @ts-ignore
  definitionFilter(
    options: Omit<FinalOptionsOfComponent, "customEvents" | "store" | "events" | "computed">,
  ) {
    // 触发beforeCreate生命周期函数
    const beforeCreateFunc = options.lifetimes.beforeCreate;

    if (beforeCreateFunc) {
      beforeCreateFunc.call(undefined, options);
    }
  },
});
