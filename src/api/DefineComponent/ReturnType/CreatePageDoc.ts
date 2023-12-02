import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersectionDeep } from "hry-types/src/Object/ComputeIntersectionDeep";
import type { RootComponentDoc } from "../../RootComponent/RootComponentDoc";

export type CreatePageDoc<
  TRootDoc extends RootComponentDoc,
  TPath extends string,
> = ComputeIntersectionDeep<
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
