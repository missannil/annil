import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { RootComponentReturnType } from "../../RootComponent/returnType";

/**
 * 生成页面文档类型
 * type PageDoc = { path: TPath, properties?: TRootDoc["properties"] }
 */
export type CreatePageDoc<
  TRootDoc extends RootComponentReturnType,
  TPath extends string,
> = ComputeIntersection<
  & { path: TPath }
  & IfExtends<
    unknown,
    TRootDoc["properties"],
    unknown,
    {
      properties: TRootDoc["properties"];
    }
  >
>;
