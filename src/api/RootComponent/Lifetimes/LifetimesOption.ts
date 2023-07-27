import type { LifetimesConstraint } from "./LifetimesConstraint";

export type LifetimesOption<TIsPage extends boolean> = TIsPage extends false // 组件开通lifetimes字段
  ? {
    lifetimes?: LifetimesConstraint;
  }
  // 页面关闭lifetimes字段(其实也可以开启)
  : unknown;
