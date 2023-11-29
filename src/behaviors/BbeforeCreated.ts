import type { FinalOptionsForComponent } from "../api/DefineComponent";

export const BBeforeCreate = Behavior({
  definitionFilter(options: FinalOptionsForComponent) {
    // 触发beforeCreate生命周期函数
    const beforeCreateFunc = options.lifetimes!.beforeCreate;

    beforeCreateFunc && beforeCreateFunc(options);
  },
});
