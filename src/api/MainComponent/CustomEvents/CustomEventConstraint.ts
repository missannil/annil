import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { SpecificType } from "../../../types/SpecificType";

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
export type BubblesOptions = ComputeIntersection<Bubbles & NonComposed & NonCapturePhase>;

// 2. CapturePhase
export type CapturePhaseOptions = ComputeIntersection<CapturePhase & NonBubbles & NonComposed>;

// 3. Bubbles and CapturePhase
export type BubblesCapturePhaseOptions = ComputeIntersection<Bubbles & CapturePhase & NonComposed>;

// 4. Bubbles and Composed
export type BubblesComposedOptions = ComputeIntersection<Bubbles & Composed & NonCapturePhase>;

// 5. CapturePhase and Composed

export type CapturePhaseComposedOptions = ComputeIntersection<CapturePhase & Composed & NonBubbles>;

// 6. Bubbles and CapturePhase and Composed
export type BubblesCapturePhaseComposedOptions = ComputeIntersection<Bubbles & Composed & CapturePhase>;

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
