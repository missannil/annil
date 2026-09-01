import type { _SimplifyIntersection } from "hry-types";
import type { IfExtends } from "../../../types/IfExtends";
import type { RootComponentDefinition } from "../../RootComponent/returnType";

/**
 * 生成页面文档类型
 * type PageDoc = { path: TPath, properties?: TRootDoc["properties"] }
 */
export type GeneratePageDoc<
  TRootDoc extends RootComponentDefinition,
  TPath extends string,
> = _SimplifyIntersection<
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
