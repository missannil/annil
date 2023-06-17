import type { Select } from "hry-types/src/Object/Select";

import type { Cast } from "hry-types/src/Any/Cast";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { InferSpecificType } from "./InferSpecificType";
import type { OptionalTypes, PropertiesConstraint } from "./PropertiesConstraint";

type OptionalProperties = Record<string, OptionalTypes>;

export type GetOptionalDoc<
  T extends PropertiesConstraint,
  Optional extends OptionalProperties = Cast<
    Select<T, OptionalTypes>,
    OptionalProperties
  >,
> = {
  [k in keyof Optional]?: IfExtends<
    unknown,
    Optional[k]["optionalTypes"],
    InferSpecificType<Optional[k]["type"]>,
    InferSpecificType<Optional[k]["type"] | NonNullable<(Optional[k]["optionalTypes"])>[number]>
  >;
};
