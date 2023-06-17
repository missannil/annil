import type { Cast } from "hry-types/src/Any/Cast";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { WatchConstraint } from "./WatchConstraint";

/**
 * @returns unknown 或 { watch?: WatchConstraint }
 */
export type Watch<TAllData> = IfExtends<unknown, TAllData, unknown, {
  watch?:
    & WatchConstraint<
      Cast<TAllData, object>
    >
    // 为了可以单独写计算属性而不报错,会导致超出字段无报错提示!
    & Record<string, (newValue: unknown, oldValue: unknown) => void>;
}>;
