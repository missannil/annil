import type { O } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { AddSubObjectKey } from "hry-types/src/Object/AddSubObjectKey";

/**
 * 重写实例的setData类型
 */
export type CustomSetData<TData extends object> = {
  /**
   * setData只可以对自身data中非响应式数据字段进行设置
   */
  setData(
    options: IfExtends<{}, TData, EmptyObject, O.ComputeIntersectionDeep<Partial<AddSubObjectKey<TData>>>>,
    callback?: () => void,
  ): void;
};
