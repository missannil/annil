import type { O } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { WMPageLifetime, WMPageLifetimes } from "../../../types/officialAlias";

export type PageLifetimes<TIsPage extends boolean, PropertiesDoc> = IfExtends<
  TIsPage,
  false,
  {
    pageLifetimes?:
      // 官方组件页面生命周期
      & Partial<WMPageLifetimes>
      // 自定义周期
      & { load?: () => void };
  }, // 自定义页面生命周期
  {
    pageLifetimes?:
      & Partial<Omit<WMPageLifetime, "onLoad">>
      // 替换掉官方的 Parameters<WechatMiniprogram.Page.ILifetime['onLoad']>
      & {
        onLoad?: (
          properties: O.NonNullableInObject<Required<PropertiesDoc>>,
        ) => void;
      };
  }
>;
