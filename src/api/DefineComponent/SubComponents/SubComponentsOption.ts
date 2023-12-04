// import type { Extends } from "hry-types/src/Any/Extends";
// import type { IfExtends } from "hry-types/src/Any/IfExtends";
// import type { GetPropertiesDuplicatedKeys } from "../../../types/GetPropertiesDuplicatedKeys";
// import type { Shift } from "../../../types/Shift";
// import type { UnionToComma } from "../../../types/UnionToComma.test";
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
