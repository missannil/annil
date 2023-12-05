import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { WMCompPageLifetimes, WMPageLifetimes } from "../../../types/OfficialTypeAlias";

export type PageLifetimesOption<TIsPage extends boolean, PropertiesDoc extends object> = IfExtends<
  TIsPage,
  false,
  {
    /**
     * 比官方定义新增load周期,发生在页面onLoad事件后
     */
    pageLifetimes?: ComputeIntersection<
      // 官方组件页面生命周期
      & Partial<WMCompPageLifetimes>
      & {
        /**
         * 事件发生在页面onLoad事件后,要求组件为同步组件
         */
        load?: (props: object) => void | Promise<void>;
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
          // 页面时PropertiesDoc对象字段是格外不加null的
          props: PropertiesDoc,
        ) => void | Promise<void>;
      }
    >;
  }
>;
