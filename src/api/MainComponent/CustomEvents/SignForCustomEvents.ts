import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type {
  BubblesCapturePhaseComposedOptions,
  BubblesCapturePhaseOptions,
  BubblesComposedOptions,
  BubblesOptions,
  CapturePhaseComposedOptions,
  CapturePhaseOptions,
  CustomEventsOptions,
} from "./CustomEventConstraint";

export type BubblesSign = () => "bubbles";

export type CapturePhaseSign = () => "capturePhase";

export type BubblesCapturePhaseSign = () => "bubbles" | "capturePhase";

export type BubblesComposedSign = () => "bubbles" | "composed";

export type CapturePhaseComposedSign = () => "capturePhase" | "composed";

export type BubblesCapturePhaseComposedSign = () => "bubbles" | "capturePhase" | "composed";

export type CustomEventsSign =
  | BubblesSign
  | CapturePhaseSign
  | BubblesCapturePhaseSign
  | BubblesComposedSign
  | CapturePhaseComposedSign
  | BubblesCapturePhaseComposedSign;

export type SignForCustomEvents<Options extends CustomEventsOptions> = IfExtends<
  BubblesOptions,
  Options,
  BubblesSign,
  IfExtends<
    CapturePhaseOptions,
    Options,
    CapturePhaseSign,
    IfExtends<
      BubblesCapturePhaseOptions,
      Options,
      BubblesCapturePhaseSign,
      IfExtends<
        BubblesComposedOptions,
        Options,
        BubblesComposedSign,
        IfExtends<
          CapturePhaseComposedOptions,
          Options,
          CapturePhaseComposedSign,
          IfEquals<BubblesCapturePhaseComposedOptions, Options, BubblesCapturePhaseComposedSign>
        >
      >
    >
  >
>;
