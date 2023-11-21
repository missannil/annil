export const BBeforeCreate = Behavior({
  definitionFilter(options) {
    // 触发beforeCreate生命周期函数
    const beforeCreateFunc = options.lifetimes?.beforeCreate;

    beforeCreateFunc && beforeCreateFunc(options);
  },
});
