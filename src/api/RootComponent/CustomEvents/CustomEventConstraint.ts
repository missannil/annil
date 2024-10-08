import type { DetailedType } from "../../../types/DetailedType";

type SimpleCustomeEvents = DetailedType | null | undefined;

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
  detail: ShortCustomeEvents;
  options: OptionsFieldsConfigOfCustomEvents;
  debounce?: never;
  throttle?: never;
} | {
  detail: ShortCustomeEvents;
  options?: never;
  debounce: number;
  throttle?: never;
} | {
  detail: ShortCustomeEvents;
  options?: never;
  debounce?: never;
  throttle: number;
} | {
  detail: ShortCustomeEvents;
  options: OptionsFieldsConfigOfCustomEvents;
  debounce?: never;
  throttle: number;
} | {
  detail: ShortCustomeEvents;
  options: OptionsFieldsConfigOfCustomEvents;
  debounce: number;
  throttle?: never;
};

export type CustomEvents = FullCustomEvents | ShortCustomeEvents;

export type CustomEventConstraint = Record<string, CustomEvents>;
