import type { SubComponentType } from "../../SubComponent/SubComponentType";

/**
 * RootComponent API 的`subComponents`字段配置
 */
export type SubComponentsOption<
  TSubComponentTuple extends SubComponentType[],
> = {
  /**
   * 子组件列表
   */
  subComponents?: [...TSubComponentTuple];
};
