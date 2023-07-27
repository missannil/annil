import type { IfExtends } from "hry-types/src/Any/IfExtends";
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

export type Composed = () => "Composed";

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

export type AddTagForCustomEventsDoc<Options extends OptionsFieldsConfigOfCustomEvents> = IfExtends<
  BubblesOption,
  Options,
  Bubbles,
  IfExtends<
    CaptureOption,
    Options,
    Capture,
    IfExtends<
      BubblesCaptureOption,
      Options,
      BubblesCapture,
      IfExtends<
        BubblesComposedOption,
        Options,
        BubblesComposed,
        IfExtends<
          CaptureComposedOption,
          Options,
          CaptureComposed,
          IfExtends<BubblesCaptureComposedOption, Options, BubblesCaptureComposed>
        >
      >
    >
  >
>;
