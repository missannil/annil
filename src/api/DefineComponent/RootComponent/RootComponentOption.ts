import type { RootComponentReturnType } from "../../RootComponent/returnType";

/**
 * DefineComponent API`rootComponent`字段配置
 */
export type RootComponentOption<TRootComponentReturnType extends RootComponentReturnType> = {
  /**
   * 根组件配置
   */
  rootComponent?: TRootComponentReturnType;
};
