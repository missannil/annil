import type { V } from "hry-types";

import { InstanceInject } from "../../InstanceInject";
import type { DataConstraint } from "./DataConstraint";

export type Data< TData extends DataConstraint, TProperties> = {
  data?:
    & TData
    & V.DuplicateFieldValidation<TData, keyof InstanceInject["data"], "与注入的data字段重复">
    & V.DuplicateFieldValidation<TData, keyof TProperties, "与properties字段重复">;
};
