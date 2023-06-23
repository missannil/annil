import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type {
  BubblesCapturePhaseComposedOptions,
  CustomEventsOptions,
  OnlyBubbles,
  OnlyBubblesComposed,
  OnlyCapturePhase,
  OnlyCapturePhaseComposed,
} from "./CustomEventConstraint";
// 使用函数返回可在提示中显示类型别名
export type BubblesSign = () => "bubbles";
export type CapturePhaseSign = () => "capturePhase";
export type BubblesComposedSign = () => "bubbles" | "composed";
export type CapturePhaseComposedSign = () => "capturePhase" | "composed";
export type BubblesCapturePhaseComposedSign = () => "bubbles" | "capturePhase" | "composed";

export type SignForCustomEvents<Options extends CustomEventsOptions> = IfEquals<
  Options,
  OnlyBubbles,
  BubblesSign,
  IfEquals<
    Options,
    OnlyCapturePhase,
    CapturePhaseSign,
    IfEquals<
      Options,
      OnlyBubblesComposed,
      BubblesComposedSign,
      IfEquals<
        Options,
        OnlyCapturePhaseComposed,
        CapturePhaseComposedSign,
        IfEquals<Options, BubblesCapturePhaseComposedOptions, BubblesCapturePhaseComposedSign>
      >
    >
  >
>;
