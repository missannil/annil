import type { FinalOptionsOfComponent } from "../api/DefineComponent/assignOptions";
import { assertNonNullable } from "../utils/assertNonNullable";

export const BBeforeCreate = Behavior({
  // @ts-ignore
  definitionFilter(
    options: Omit<FinalOptionsOfComponent, "customEvents" | "store" | "events" | "computed">,
  ) {
    // 触发beforeCreate生命周期函数  options.lifetimes在之前被赋值过默认{}所以！
    const beforeCreateFunc = assertNonNullable(options.lifetimes).beforeCreate;

    if (beforeCreateFunc) {
      beforeCreateFunc.call(undefined, options);
    }
  },
});
