import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { WMTriggerEventOption } from "../../../common_types/officialAlias";
import type { CustomEventConstraint, FullEvent } from "./CustomEventConstraint";

export type OptionsFiledValidator<TCustomEvents extends CustomEventConstraint> = {
  [
    k in keyof TCustomEvents as TCustomEvents[k] extends FullEvent
      ? IfEquals<Exclude<keyof TCustomEvents[k]["options"], keyof WMTriggerEventOption>, never, never, k>
      : never
  ]: TCustomEvents[k] extends FullEvent ? {
      options: {
        [
          d in Exclude<
            keyof TCustomEvents[k]["options"],
            keyof WMTriggerEventOption
          >
        ]: () => "⚠️非 bubbles|composed|capturePhase字段⚠️";
      };
    }
    : never;
};
