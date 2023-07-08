import type { V } from "hry-types";

import type { MethodsConstraint } from "./MethodsConstraint";

export type Methods<
  TMethods extends MethodsConstraint,
  EventsDoc extends object,
  // 看到如下 'extends xxx | yyy '时表示或关系,后续判断(IfEquals)时便于理解
  TCustomEvents extends object,
> = {
  methods?:
    & TMethods
    & V.DuplicateFieldValidator<TMethods, keyof EventsDoc | keyof TCustomEvents, "字段重复">;
};
