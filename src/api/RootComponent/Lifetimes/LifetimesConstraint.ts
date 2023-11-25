import type { WMCompLifetimes } from "../../../types/OfficialTypeAlias";

export type LifetimesConstraint = // 官方组件生命周期
  WMCompLifetimes["lifetimes"];
// & {
//   /**
//    * 建立组件时的真正配置对象
//    */
//   beforeCreate?: (options: WMTrivialOption<any, any, any, any, false>) => void;
// };
