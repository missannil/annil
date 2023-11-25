import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { RemoveNullOfRequired } from "../../../types/RemoveNullOfRequired";
import type { RootComponentDoc } from "../../RootComponent/RootComponentDoc";
import type { SubComponentDoc } from "../../SubComponent/SubComponentDoc";
import type { GetPropertiesDocOfSubDoc } from "./GetPropertiesDocOfSubDoc";

export type CreatePageDoc<
  TRootDoc extends RootComponentDoc,
  TPath extends string,
  TSubComponentTuple extends SubComponentDoc[],
  // 获取所有properties字段
  AllPropertiesDoc = TRootDoc["properties"] & GetPropertiesDocOfSubDoc<TSubComponentTuple>,
> = ComputeIntersectionDeep<
  & { path: TPath }
  & IfExtends<
    unknown,
    AllPropertiesDoc,
    unknown,
    {
      // @ts-ignore AllPropertiesDoc 必为 object
      //  RemoveNullOfRequired 页面传值时必传字段不需要RootComponent返回时为对象加入的null类型
      properties: RemoveNullOfRequired<AllPropertiesDoc>;
    }
  >
>;
