import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { RootComponentDoc } from "../../RootComponent/RootComponentDoc";

export type CreatePageDoc<
  TRootDoc extends RootComponentDoc,
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
