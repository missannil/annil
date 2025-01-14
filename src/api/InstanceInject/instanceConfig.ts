import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { ReturnTypeInObject } from "hry-types/src/Object/ReturnTypeInObject";
import type { WMComponentOption } from "../../types/OfficialTypeAlias";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";

// 利用继承的多态性 使得IInjectInfo类型可由使用者外部定义
interface BaseInjectInfo {
  [key: string]: unknown;
  options?: WMComponentOption;
  methods?: MethodsConstraint;
  data?: DataConstraint;
  store?: StoreConstraint;
  behaviors?: string[];
}

export interface IInjectInfo extends BaseInjectInfo {
}

export type IInjectAllData = IfEquals<
  {},
  injectData & IInjectStore,
  {},
  ComputeIntersection<injectData & IInjectStore>
>;

type injectData = DataConstraint extends IInjectInfo["data"] ? {} : IInjectInfo["data"];

export type IInjectStore = StoreConstraint extends IInjectInfo["store"] ? {}
  : ReturnTypeInObject<IInjectInfo["store"]>;

export type IInjectMethods = MethodsConstraint extends IInjectInfo["methods"] ? {} : IInjectInfo["methods"];

/**
 * 实例配置接口
 */
class InstanceConfig {
  private info: { injectInfo?: IInjectInfo } = {};
  public get injectInfo() {
    return this.info.injectInfo;
  }
  public setInjectInfo(info: IInjectInfo | undefined) {
    if (info) this.info.injectInfo = info;
  }
}

export const instanceConfig = new InstanceConfig();
