import type { MergeIntersection } from "hry-types/src/Object/MergeIntersection";
import type { SpecificType } from "../../../common_types/SpecificType";

type NonListShortCustomeEvents = SpecificType | null;

export type ShortCustomEventsList = NonListShortCustomeEvents[];

export type ShortCustomeEvents = NonListShortCustomeEvents | ShortCustomEventsList;

// 基本字段
type Bubbles = { bubbles: true };

type CapturePhase = { capturePhase: true };

type Composed = { composed: true };

type NonBubbles = { bubbles?: never };

type NonComposed = { composed?: never };

type NonCapturePhase = { capturePhase?: never };

// 组合字段options
// 1. Bubbles
export type BubblesOptions = MergeIntersection<Bubbles & NonComposed & NonCapturePhase>;

// 2. CapturePhase
export type CapturePhaseOptions = MergeIntersection<CapturePhase & NonBubbles & NonComposed>;

// 3. Bubbles and CapturePhase
export type BubblesCapturePhaseOptions = MergeIntersection<Bubbles & CapturePhase & NonComposed>;

// 4. Bubbles and Composed
export type BubblesComposedOptions = MergeIntersection<Bubbles & Composed & NonCapturePhase>;

// 5. CapturePhase and Composed

export type CapturePhaseComposedOptions = MergeIntersection<CapturePhase & Composed & NonBubbles>;

// 6. Bubbles and CapturePhase and Composed
export type BubblesCapturePhaseComposedOptions = MergeIntersection<Bubbles & Composed & CapturePhase>;

export type CustomEventsOptions =
  | BubblesOptions
  | CapturePhaseOptions
  | BubblesCapturePhaseOptions
  | BubblesComposedOptions
  | CapturePhaseComposedOptions
  | BubblesCapturePhaseComposedOptions;

export type FullCustomEvents = {
  detailType: ShortCustomeEvents;
  options: CustomEventsOptions;
};

export type CustomEventConstraint = Record<string, FullCustomEvents | ShortCustomeEvents>;
