import type { _SimplifyIntersection, IfAllExtends } from "hry-types";
import type { WMCompPageLifetimes, WMPageLifetimes } from "../../../types/OfficialTypeAlias";

export type PageLifetimesOption<TIsPage extends boolean, PropertiesDoc extends object> = IfAllExtends<
  TIsPage,
  false,
  {
    pageLifetimes?: Partial<WMCompPageLifetimes>;
  },
  {
    /**
     * 官方要求写入methods中的页面生命周期
     */
    pageLifetimes?: _SimplifyIntersection<
      & Partial<Omit<WMPageLifetimes, "onLoad">>
      // 替换掉官方的 Parameters<WechatMiniprogram.Page.ILifetime['onLoad']>
      & {
        /** 生命周期回调—监听页面加载
         *
         * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取Properties定义的数据。
         */
        onLoad?: (
          props: Required<PropertiesDoc>,
        ) => void | Promise<void>;
      }
    >;
  }
>;
