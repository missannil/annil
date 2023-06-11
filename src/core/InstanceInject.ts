/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import type { IfEquals } from "hry-types";
import type { DataConstraint, GetDataKeyTypes } from "../types/Data";
import type { GetDataDoc } from "../types/GetDataDoc";
import type { methodConstraint } from "../types/methodConstraint";
import type { WMComponentOption } from "../types/officialAlias";

export abstract class IInject {
  public options?: WMComponentOption;
  public methods?: methodConstraint;
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

/**
 * 获取注入方法实例
 */
export type IinjectMethodsDoc = IfEquals<InstanceInject["methods"] & {}, methodConstraint, unknown>;
/**
 * 获取注入data实例
 */
export type IinjectDataDoc<
  T extends GetDataKeyTypes = "函数值类型变为函数返回类型",
> = IfEquals<
  InstanceInject["data"] & {},
  DataConstraint,
  unknown,
  GetDataDoc<InstanceInject["data"] & {}, T>
>;
