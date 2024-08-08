import type { RootComponentType } from "../../RootComponent/RootComponentType";

/**
 * DefineComponent API`rootComponent`字段配置
 */
export type RootComponentOption<TRootComponent extends RootComponentType> = {
  /**
   * 根组件配置
   */
  rootComponent?: TRootComponent;
};
