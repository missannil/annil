import type { G } from "hry-types";

export type SubDataOption<TSubData extends object, legalKeys extends PropertyKey> = {
  /**
   * 可写子组件所需数据和内部公共数据
   * 非法字段检测和与Inherit字段的重复检测
   */
  data?:
    & TSubData
    & G.IllegalFieldValidator<
      TSubData,
      legalKeys,
      0,
      "",
      "子组件无需此字段或与Inherit字段重复"
    >;
};
