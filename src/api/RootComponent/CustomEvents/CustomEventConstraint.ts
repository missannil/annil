import type { SpecificType } from "../../../types/SpecificType";

type SimpleCustomeEvents = SpecificType | null;

export type SimpleCustomeEventsList = SimpleCustomeEvents[];

export type ShortCustomeEvents = SimpleCustomeEvents | SimpleCustomeEventsList;

// options
type BubblesConfig = { bubbles: true };

type CaptureConfig = { capturePhase: true };

type ComposedCongifg = { composed: true };

type NonBubblesConfig = { bubbles?: never };

type NonComposedConfig = { composed?: never };

type NonCaptureConfig = { capturePhase?: never };

export type BubblesOption = BubblesConfig & NonComposedConfig & NonCaptureConfig;

export type CaptureOption = CaptureConfig & NonBubblesConfig & NonComposedConfig;

export type BubblesCaptureOption = BubblesConfig & CaptureConfig & NonComposedConfig;

export type BubblesComposedOption = BubblesConfig & ComposedCongifg & NonCaptureConfig;

export type CaptureComposedOption = CaptureConfig & ComposedCongifg & NonBubblesConfig;

export type BubblesCaptureComposedOption = BubblesConfig & ComposedCongifg & CaptureConfig;

export type OptionsFieldsConfigOfCustomEvents =
  | BubblesOption
  | CaptureOption
  | BubblesCaptureOption
  | BubblesComposedOption
  | CaptureComposedOption
  | BubblesCaptureComposedOption;

/**
 * 带options的CustomEvents配置
 */
export type FullCustomEvents = {
  detailType: ShortCustomeEvents;
  options: OptionsFieldsConfigOfCustomEvents;
};

export type CustomEventConstraint = Record<string, FullCustomEvents | ShortCustomeEvents>;
