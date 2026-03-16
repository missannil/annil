import type { RootComponentDefinition } from "../../RootComponent/RootComponentDefinition";

/**
 * DefineComponent API`rootComponent`字段配置
 */
export type RootComponentOption<TRootComponentReturnType extends RootComponentDefinition> = {
  /**
   * 根组件配置
   */
  rootComponent?: TRootComponentReturnType;
};
