import type { CustomComponentDefinition } from "../../CustomComponent/CustomComponentDefinition";

/**
 * RootComponent API 的`subComponents`字段配置
 * 实际子组件包括CustomComponent和ChunkComponent,但ChunkComponent的返回类型为never,所以这里只用CustomComponentReturnType来约束子组件类型。
 */
export type SubComponentsOption<
  TCustomComponentReturnTypeList extends CustomComponentDefinition[],
> = {
  /**
   * 子组件列表
   */
  subComponents?: [...TCustomComponentReturnTypeList];
};
