import type { RootComponentDoc } from "../../RootComponent/RootComponentDoc";

/**
 * DefineComponent API`rootComponent`字段配置
 */
export type RootComponentOption<TRootComponent extends RootComponentDoc> = {
  rootComponent?: TRootComponent;
};
