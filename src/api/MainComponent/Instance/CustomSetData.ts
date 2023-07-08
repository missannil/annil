import type { O } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { AddSubObjectKey } from "hry-types/src/Object/AddSubObjectKey";

/**
 * 重写实例的setData类型
 */
export type CustomSetData<TAllData extends object> = {
  /**
   * @description setData只可以对自身data中的非响应式数据字段进行设置,如需要强行setData其他字段,在options后面加上as any
   * @param options
   * @param callback
   */
  setData(
    options: IfExtends<unknown, TAllData, EmptyObject, O.ComputeIntersection<Partial<AddSubObjectKey<TAllData>>>>,
    callback?: () => void,
  ): void;
};
