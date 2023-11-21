import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { WMCompPageLifetimes, WMPageLifetimes } from "../../../types/officialCorrelation";
import type { RemoveNullOfRequired } from "../../../types/RemoveNullOfRequired";

export type PageLifetimesOption<TIsPage extends boolean, PropertiesDoc extends object> = IfExtends<
  TIsPage,
  false,
  {
    pageLifetimes?:
      // 官方组件页面生命周期
      & Partial<WMCompPageLifetimes>
      & {
        /**
         * 事件发生在页面load事件后,要求组件为同步组件
         */
        load?: () => void;
      };
  },
  {
    pageLifetimes?:
      & Partial<Omit<WMPageLifetimes, "onLoad">>
      // 替换掉官方的 Parameters<WechatMiniprogram.Page.ILifetime['onLoad']>
      & {
        onLoad?: (
          // 必传字段去掉null
          props: ComputeIntersection<Required<RemoveNullOfRequired<PropertiesDoc>>>,
        ) => void;
      };
  }
>;
