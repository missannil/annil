/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Checking, type Test } from "hry-types";
import type {
  Bubbles,
  BubblesCapture,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
} from "../CustomEventsTag";

import type { GetFullCustomEventsDoc } from "../GetCustomEventDoc";
import { type mock_fullCustomEvents } from "./normal.test";

// bubbles
type bubblesResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles"]>;

export type bubblesExpected = string | Bubbles;

Checking<bubblesResult, bubblesExpected, Test.Pass>;

// CapturePhase
type CapturePhaseResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["capturePhase"]>;

export type CapturePhaseExpected = Capture | null;

Checking<CapturePhaseResult, CapturePhaseExpected, Test.Pass>;

// bubbles_capturePhase
type BubblesCapturePhaseResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles_capturePhase"]>;

export type BubblesCapturePhaseExpected = string | number | BubblesCapture;

Checking<BubblesCapturePhaseResult, BubblesCapturePhaseExpected, Test.Pass>;

// bubbles_composed
type BubblesComposedResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles_composed"]>;

export type BubblesComposedExpected = "male" | "female" | BubblesComposed;

Checking<BubblesComposedResult, BubblesComposedExpected, Test.Pass>;

// capturePhase_composed
type CapturePhaseComposedResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["capturePhase_composed"]>;

export type CapturePhaseComposedExpected = string | 0 | 1 | 2 | null | CaptureComposed;

Checking<CapturePhaseComposedResult, CapturePhaseComposedExpected, Test.Pass>;

// bubbles_capturePhase_composed
type BubblesCapturePhaseComposedResult = GetFullCustomEventsDoc<
  typeof mock_fullCustomEvents["bubbles_capturePhase_composed"]
>;

export type BubblesCapturePhaseComposedExpected = boolean | BubblesCaptureComposed;

Checking<BubblesCapturePhaseComposedResult, BubblesCapturePhaseComposedExpected, Test.Pass>;
