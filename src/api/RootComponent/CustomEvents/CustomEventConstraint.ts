import type { DetailedType } from "../../../types/DetailedType";

type SimpleCustomEvents = DetailedType | null | undefined;

export type SimpleCustomEventsList = SimpleCustomEvents[];

export type SimpleCustomeEventsList = SimpleCustomEventsList;

export type ShortCustomEvents = SimpleCustomEvents | SimpleCustomEventsList;

// options
type BubblesConfig = { bubbles: true };

type CaptureConfig = { capturePhase: true };

type ComposedConfig = { composed: true };

type NonBubblesConfig = { bubbles?: never };

type NonComposedConfig = { composed?: never };

type NonCaptureConfig = { capturePhase?: never };

export type BubblesOption = BubblesConfig & NonComposedConfig & NonCaptureConfig;

export type CaptureOption = CaptureConfig & NonBubblesConfig & NonComposedConfig;

export type BubblesCaptureOption = BubblesConfig & CaptureConfig & NonComposedConfig;

export type BubblesComposedOption = BubblesConfig & ComposedConfig & NonCaptureConfig;

export type CaptureComposedOption = CaptureConfig & ComposedConfig & NonBubblesConfig;

export type BubblesCaptureComposedOption = BubblesConfig & ComposedConfig & CaptureConfig;

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
export type FullCustomEventsOptions = {
  detail: ShortCustomEvents;
  options: OptionsFieldsConfigOfCustomEvents;
  debounce?: never;
  throttle?: never;
};

export type FullCustomEventsWithDebounce = {
  detail: ShortCustomEvents;
  options?: never;
  debounce: number;
  throttle?: never;
};

export type FullCustomEventsWithThrottle = {
  detail: ShortCustomEvents;
  options?: never;
  debounce?: never;
  throttle: number;
};

export type FullCustomEventsOptionsWithThrottle = {
  detail: ShortCustomEvents;
  options: OptionsFieldsConfigOfCustomEvents;
  debounce?: never;
  throttle: number;
};

export type FullCustomEventsOptionsWithDebounce = {
  detail: ShortCustomEvents;
  options: OptionsFieldsConfigOfCustomEvents;
  debounce: number;
  throttle?: never;
};

export type FullCustomEvents =
  | FullCustomEventsOptions
  | FullCustomEventsWithDebounce
  | FullCustomEventsWithThrottle
  | FullCustomEventsOptionsWithThrottle
  | FullCustomEventsOptionsWithDebounce;

export type CustomEvents = FullCustomEvents | ShortCustomEvents;

export type CustomEventConstraint = Record<string, CustomEvents>;
