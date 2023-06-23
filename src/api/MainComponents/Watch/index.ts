import type { AnyObject } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";

/**
 * @returns unknown 或 { watch?: WatchConstraint }
 */
export type Watch<TWatchData extends AnyObject = {}> = IfExtends<{}, TWatchData, unknown, {
  watch?: {
    [k in keyof TWatchData]?: (newValue: TWatchData[k], oldValue: TWatchData[k]) => void;
  };
  // 为了可以单独写计算属性而不报错,会导致超出字段无报错提示!
  // & Record<string, (newValue: unknown, oldValue: unknown) => void>;
}>;
