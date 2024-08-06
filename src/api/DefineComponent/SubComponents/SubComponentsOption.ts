import type { SubComponentDoc } from "../../SubComponent/SubComponentDoc";

/**
 * RootComponent API 的`subComponents`字段配置
 */
export type SubComponentsOption<
  TSubComponentTuple extends SubComponentDoc[],
> = {
  /**
   * 子组件列表
   */
  subComponents?: [...TSubComponentTuple];
};
