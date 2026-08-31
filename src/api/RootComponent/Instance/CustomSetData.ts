import type { _AddNestedKeys, EmptyObject, O } from "hry-types";
import type { IfExtends } from "../../../types/IfExtends";

/**
 * 重写实例的setData类型
 */
export type CustomSetData<TData extends object> = {
  /**
   * setData只可以对自身data中非响应式数据字段进行设置
   */
  setData(
    options: IfExtends<{}, TData, EmptyObject, O._SimplifyIntersectionDeep<Partial<_AddNestedKeys<TData>>>>,
    callback?: () => void,
  ): void;
};
