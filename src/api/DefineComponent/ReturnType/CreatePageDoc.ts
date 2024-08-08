import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { RootComponentType } from "../../RootComponent/RootComponentType";

export type CreatePageDoc<
  TRootDoc extends RootComponentType,
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
