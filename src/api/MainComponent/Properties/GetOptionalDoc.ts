import type { As } from "hry-types/src/Any/As";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Select } from "hry-types/src/Object/Select";
import type { InferSpecificType } from "../../../types/InferSpecificType";
import type { OptionalTypes, PropertiesConstraint } from "./PropertiesConstraint";

type OptionalProperties = Record<string, OptionalTypes>;

export type GetOptionalDoc<
  T extends PropertiesConstraint,
  Optional extends OptionalProperties = As<
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
