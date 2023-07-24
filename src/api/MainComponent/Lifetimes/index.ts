import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { WMCompLifetimes } from "../../../types/officialAlias";

export type Lifetimes<TIsPage extends boolean> = IfExtends<
  TIsPage,
  false,
  // 组件开通lifetimes字段
  {
    lifetimes?:
      // 官方组件生命周期
      & Partial<WMCompLifetimes["lifetimes"]>
      // 自定义的周期
      & {
        /**
         * 建立组件时
         * 可使用create字段,但为了避免和created混淆用了beforeCreate字段
         * @param options 配置
         * @returns
         */
        beforeCreate?: (options: any) => void;
      };
  },
  // 页面关闭lifetimes字段(其实也可以开启)
  unknown
>;
