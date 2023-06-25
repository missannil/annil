import type { AnyObject } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";

/**
 * @returns unknown 或 { watch?: WatchConstraint }
 */
export type Watch<TWatchData extends AnyObject = {}> = IfExtends<{}, TWatchData, unknown, {
  watch?: {
    [k in keyof TWatchData]?: (newValue: TWatchData[k], oldValue: TWatchData[k]) => void;
  };
}>;
