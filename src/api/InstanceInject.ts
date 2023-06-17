import type { WMComponentOption } from "../common_types/officialAlias";
import type { DataConstraint } from "./MainComponents/Data.ts/DataConstraint";

import type { MethodsConstraint } from "./MainComponents/Methods/MethodsConstraint";

export abstract class IInject {
  public options?: WMComponentOption;
  public methods?: MethodsConstraint;
  public data?: DataConstraint;
}
/**
 * @description 实例注入接口,加入数据到所有实例中(当前仅支持data,methods,options字段),可在this上获取对应数据 响应式需函数返回方式
 * @example
 */
export class InstanceInject extends IInject {
  private static _injectOption = new InstanceInject();
  public static get InjectOption(): InstanceInject {
    return this._injectOption;
  }
  public static set InjectOption(options: InstanceInject) {
    this._injectOption = options;
  }
}
