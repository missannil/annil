import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { ComputeObject } from "../../../types/ComputeObj";
import type { WMCompPageLifetimes, WMPageLifetimes } from "../../../types/OfficialTypeAlias";
import type { RemoveNullOfRequired } from "../../../types/RemoveNullOfRequired";

export type PageLifetimesOption<TIsPage extends boolean, PropertiesDoc extends object> = IfExtends<
  TIsPage,
  false,
  {
    pageLifetimes?: ComputeIntersection<
      // 官方组件页面生命周期
      & Partial<WMCompPageLifetimes>
      & {
        /**
         * 周期发生在组件attached之后,页面onLoad之前,要求组件为同步组件
         * 最低基础库： `3.0.2`
         */
        load?: (props?: object) => void;
      }
    >;
  },
  {
    /**
     * 官方要求写入methods中的页面生命周期
     */
    pageLifetimes?: ComputeIntersection<
      & Partial<Omit<WMPageLifetimes, "onLoad">>
      // 替换掉官方的 Parameters<WechatMiniprogram.Page.ILifetime['onLoad']>
      & {
        /** 生命周期回调—监听页面加载
         *
         * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取Properties定义的数据。
         */
        onLoad?: (
          // 默认PropertiesDoc
          props: ComputeObject<RemoveNullOfRequired<PropertiesDoc>>,
        ) => void | Promise<void>;
      }
    >;
  }
>;
