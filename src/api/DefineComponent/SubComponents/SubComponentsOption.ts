import type { CustomComponentDefinition } from "../../CustomComponent/returnType";

/**
 * RootComponent API 的`subComponents`字段配置
 */
export type SubComponentsOption<
  TSubComponentReturnTypeList extends CustomComponentDefinition[],
> = {
  /**
   * 子组件列表
   */
  subComponents?: [...TSubComponentReturnTypeList];
};
