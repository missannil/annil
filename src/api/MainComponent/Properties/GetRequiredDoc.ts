import type { As } from "hry-types/src/Any/As";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { Select } from "hry-types/src/Object/Select";
import type { InferSpecificType } from "./InferSpecificType";
import type { PropertiesConstraint, RequiredSingle, RequiredTypes, RequiredUnion } from "./PropertiesConstraint";
import type { PuerObjectAddNull } from "./PuerObjectAddNull";

/**
 * type 为对象的必传字段 加入null
 */
export type GetRequiredDoc<
  T extends PropertiesConstraint,
  Required = Select<T, RequiredTypes>,
> = {
  [k in keyof Required]: IfExtends<
    Required[k],
    RequiredSingle,
    PuerObjectAddNull<InferSpecificType<Required[k]>>,
    | PuerObjectAddNull<InferSpecificType<As<Required[k], RequiredUnion>["type"]>>
    | InferSpecificType<As<Required[k], RequiredUnion>["optionalTypes"][number]>
  >;
};
