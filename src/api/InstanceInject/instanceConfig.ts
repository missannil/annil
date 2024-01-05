/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import type { ReturnTypeInObject } from "hry-types/src/Object/ReturnTypeInObject";
import type { WMComponentOption } from "../../types/OfficialTypeAlias";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";

// 利用继承的多态性 使得IInjectInfo类型可由使用者外部定义
interface BaseInjectInfo {
  options?: WMComponentOption;
  methods?: MethodsConstraint;
  data?: DataConstraint;
  store?: StoreConstraint;
  behaviors?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IInjectInfo extends BaseInjectInfo {
}

export type IInjectData = IInjectInfo["data"] & ReturnTypeInObject<IInjectInfo["store"]>;

export type IInjectStore = ReturnTypeInObject<IInjectInfo["store"]>;

export type IInjectMethods = IInjectInfo["methods"];

/**
 * 实例配置接口
 */
class InstanceConfig {
  private info: { injectInfo?: IInjectInfo } = {};
  public get injectInfo() {
    return this.info.injectInfo;
  }
  public setInjectInfo(info: IInjectInfo | undefined) {
    info && (this.info.injectInfo = info);
  }
}

export const instanceConfig = new InstanceConfig();