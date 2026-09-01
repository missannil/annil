/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../../utils/typeEqual";
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

typeEqual<bubblesResult, bubblesExpected>;

// CapturePhase
type CapturePhaseResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["capturePhase"]>;

export type CapturePhaseExpected = Capture | null;

typeEqual<CapturePhaseResult, CapturePhaseExpected>;

// bubbles_capturePhase
type BubblesCapturePhaseResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles_capturePhase"]>;

export type BubblesCapturePhaseExpected = string | number | BubblesCapture;

typeEqual<BubblesCapturePhaseResult, BubblesCapturePhaseExpected>;

// bubbles_composed
type BubblesComposedResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles_composed"]>;

export type BubblesComposedExpected = "male" | "female" | BubblesComposed;

typeEqual<BubblesComposedResult, BubblesComposedExpected>;

// capturePhase_composed
type CapturePhaseComposedResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["capturePhase_composed"]>;

export type CapturePhaseComposedExpected = string | 0 | 1 | 2 | null | CaptureComposed;

typeEqual<CapturePhaseComposedResult, CapturePhaseComposedExpected>;

// bubbles_capturePhase_composed
type BubblesCapturePhaseComposedResult = GetFullCustomEventsDoc<
  typeof mock_fullCustomEvents["bubbles_capturePhase_composed"]
>;

export type BubblesCapturePhaseComposedExpected = boolean | BubblesCaptureComposed;

typeEqual<BubblesCapturePhaseComposedResult, BubblesCapturePhaseComposedExpected>;
