import type { CustomComponentType } from "../../CustomComponent/CustomComponentType";

/**
 * RootComponent API 的`subComponents`字段配置
 */
export type SubComponentsOption<
  TSubComponentTuple extends CustomComponentType[],
> = {
  /**
   * 子组件列表
   */
  subComponents?: [...TSubComponentTuple];
};
