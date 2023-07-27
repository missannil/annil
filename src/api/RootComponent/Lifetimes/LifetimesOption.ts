import type { WMCompLifetimes, WMTrivialOption } from "../../../types/officialAlias";

export type LifetimesOption<TIsPage extends boolean> = TIsPage extends false // 组件开通lifetimes字段
  ? {
    lifetimes?:
      // 官方组件生命周期
      & WMCompLifetimes["lifetimes"]
      & {
        /**
         * 建立组件时的真正配置对象
         */
        beforeCreate?: (options: WMTrivialOption<any, any, any, any, false>) => void;
      };
  }
  // 页面关闭lifetimes字段(其实也可以开启)
  : unknown;
