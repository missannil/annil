import type { WMComponentOption } from "../../types/officialAlias";

// export type InjectMethodConstraint = Record<string, Function>;

// export type InjectDataConstraint = Record<string, unknown>;

export abstract class IInject {
  public options?: WMComponentOption;
  // public methods?: InjectMethodConstraint;
  // public data?: InjectDataConstraint;
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
