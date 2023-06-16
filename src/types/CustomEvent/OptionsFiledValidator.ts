import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { CustomEventConstraint, FullEvent } from "./CustomEventConstraint";

export type TriggerEventOption = {
  bubbles?: boolean;
  composed?: boolean;
  capturePhase?: boolean;
};
export type OptionsFiledValidator<TCustomEvents extends CustomEventConstraint> = {
  [
    k in keyof TCustomEvents as TCustomEvents[k] extends FullEvent
      ? IfEquals<Exclude<keyof TCustomEvents[k]["options"], keyof TriggerEventOption>, never, never, k>
      : never
  ]: TCustomEvents[k] extends FullEvent ? {
      options: {
        [
          d in Exclude<
            keyof TCustomEvents[k]["options"],
            keyof TriggerEventOption
          >
        ]: () => "⚠️非 bubbles|composed|capturePhase字段⚠️";
      };
    }
    : never;
};
