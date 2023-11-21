export const BBeforeCreate = Behavior({
  definitionFilter(options: any) {
    // 触发beforeCreate生命周期函数
    const beforeCreateFunc = options.lifetimes?.beforeCreate;

    beforeCreateFunc && beforeCreateFunc(options);
  },
});
