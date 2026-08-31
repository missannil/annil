import type {
  BubblesCaptureComposedOption,
  BubblesCaptureOption,
  BubblesComposedOption,
  BubblesOption,
  CaptureComposedOption,
  CaptureOption,
  OptionsFieldsConfigOfCustomEvents,
} from "./CustomEventConstraint";

export type Bubbles = () => "bubbles";

export type Capture = () => "capture";

export type Composed = () => "composed";

export type BubblesCapture = Bubbles | Capture;

export type BubblesComposed = Bubbles | Composed;

export type CaptureComposed = Capture | Composed;

export type BubblesCaptureComposed = Bubbles | Capture | Composed;

export type CustomEventsTags =
  | Bubbles
  | Capture
  | BubblesCapture
  | BubblesComposed
  | CaptureComposed
  | BubblesCaptureComposed;

export type AddTagForCustomEventsDef<Options extends OptionsFieldsConfigOfCustomEvents> = [BubblesOption] extends
  [Options] ? Bubbles
  : [CaptureOption] extends [Options] ? Capture
  : [BubblesCaptureOption] extends [Options] ? BubblesCapture
  : [BubblesComposedOption] extends [Options] ? BubblesComposed
  : [CaptureComposedOption] extends [Options] ? CaptureComposed
  : [BubblesCaptureComposedOption] extends [Options] ? BubblesCaptureComposed
  : BubblesCaptureComposedOption;
