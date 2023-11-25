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
> // // 子组件中properties字段重复的key,用做验证(报错)
 = // PropertiesDuplicatedKeys extends string = Extends<TSubComponentTuple["length"], 0 | 1> extends true ? never
  //   : GetPropertiesDuplicatedKeys<Shift<TSubComponentTuple>, keyof TSubComponentTuple[0]["properties"]>,
  {
    subComponents?: [...TSubComponentTuple];
    // & IfExtends<
    //   PropertiesDuplicatedKeys,
    //   never,
    //   unknown,
    //   `⚠️重复的字段:${UnionToComma<PropertiesDuplicatedKeys>}⚠️`
    // >;
  };
