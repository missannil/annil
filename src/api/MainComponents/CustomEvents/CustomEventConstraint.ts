import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { SpecificType } from "../../../common_types/SpecificType";

export type _ShortEvent = SpecificType | null;

export type _ShortEventList = _ShortEvent[];

export type ShortEvent = _ShortEvent | _ShortEventList;

export type OnlyBubbles = { bubbles: true };

export type OnlyCapturePhase = { capturePhase: true };

type OnlyComposed = { composed: true };

type neverBubbles = { bubbles?: never };

type neverComposed = { composed?: never };

type neverCapturePhase = { capturePhase?: never };

export type BubblesOptions = OnlyBubbles & neverComposed & neverCapturePhase;

export type OnlyBubblesComposed = MergeIntersection<OnlyBubbles & OnlyComposed>;

export type OnlyCapturePhaseComposed = MergeIntersection<OnlyCapturePhase & OnlyComposed>;

export type CapturePhaseOptions = OnlyCapturePhase & neverBubbles & neverComposed;

export type BubblesComposedOptions = OnlyBubblesComposed & neverCapturePhase;

export type CapturePhaseComposedOptions = OnlyCapturePhaseComposed & neverBubbles;

export type BubblesCapturePhaseComposedOptions = MergeIntersection<
  OnlyBubbles & OnlyCapturePhase & OnlyBubblesComposed
>;

export type CustomEventsOptions =
  | BubblesOptions
  | CapturePhaseOptions
  | BubblesComposedOptions
  | CapturePhaseComposedOptions
  | BubblesCapturePhaseComposedOptions;

export type FullEvent = {
  detailType: ShortEvent;
  options: CustomEventsOptions;
};

export type CustomEventConstraint = Record<string, FullEvent | ShortEvent>;
