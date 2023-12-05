export type SubInheritOption<TInherit> = {
  /**
   * 继承来自根组件的数据(key)或'wxml',wxml表示数据来自`.wxml`文件(例如数据来自父元素循环wx:for的数据).
   * inherit字段最终会在选项中删除,它的存在是为了ts开发时提供心智模型(类型检测),js开发好比注释功能.便于代码阅读。
   * 带类型检测
   */
  inherit?: TInherit;
};
