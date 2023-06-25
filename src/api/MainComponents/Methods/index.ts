import type { AnyObject, V } from "hry-types";

import type { MethodsConstraint } from "./MethodsConstraint";

export type Methods<
  TMethods extends MethodsConstraint,
  EventsDoc extends AnyObject,
  // 看到如下 'extends xxx | yyy '时表示或关系,后续判断(IfEquals)时便于理解
  TCustomEvents extends AnyObject,
> = {
  methods?:
    & TMethods
    & V.DuplicateFieldValidation<TMethods, keyof EventsDoc, "与events字段重复">
    & V.DuplicateFieldValidation<TMethods, keyof TCustomEvents, "与customEvents字段重复">;
};
