import type { SubComponentDefinition } from "../../SubComponent/returnType";

/**
 * RootComponent API 的`subComponents`字段配置
 */
export type SubComponentsOption<
  TSubComponentReturnTypeList extends SubComponentDefinition[],
> = {
  /**
   * 子组件列表
   */
  subComponents?: [...TSubComponentReturnTypeList];
};
