import { type Test, TypeChecking } from "hry-types";
import type { GetFullCustomEventsDoc } from "../GetFullCustomEventsDoc";
import type {
  BubblesCapturePhaseComposedSign,
  BubblesCapturePhaseSign,
  BubblesComposedSign,
  BubblesSign,
  CapturePhaseComposedSign,
  CapturePhaseSign,
} from "../SignForCustomEvents";
import { mock_fullCustomEvents } from "./CustomEventConstraint.test";

// ------------测试GetFullEventDoc泛型------------

// bubbles
type bubblesResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles"]>;

export type bubblesExpected = string | BubblesSign;

TypeChecking<bubblesResult, bubblesExpected, Test.Pass>;

// CapturePhase
type CapturePhaseResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["capturePhase"]>;

export type CapturePhaseExpected = CapturePhaseSign | null;

TypeChecking<CapturePhaseResult, CapturePhaseExpected, Test.Pass>;

// bubbles_capturePhase
type BubblesCapturePhaseResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles_capturePhase"]>;

export type BubblesCapturePhaseExpected = string | number | BubblesCapturePhaseSign;

TypeChecking<BubblesCapturePhaseResult, BubblesCapturePhaseExpected, Test.Pass>;

// bubbles_composed
type BubblesComposedResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["bubbles_composed"]>;

export type BubblesComposedExpected = "male" | "female" | BubblesComposedSign;

TypeChecking<BubblesComposedResult, BubblesComposedExpected, Test.Pass>;

// capturePhase_composed
type CapturePhaseComposedResult = GetFullCustomEventsDoc<typeof mock_fullCustomEvents["capturePhase_composed"]>;

export type CapturePhaseComposedExpected = string | 0 | 1 | 2 | null | CapturePhaseComposedSign;

TypeChecking<CapturePhaseComposedResult, CapturePhaseComposedExpected, Test.Pass>;

// bubbles_capturePhase_composed
type BubblesCapturePhaseComposedResult = GetFullCustomEventsDoc<
  typeof mock_fullCustomEvents["bubbles_capturePhase_composed"]
>;

export type BubblesCapturePhaseComposedExpected = boolean | BubblesCapturePhaseComposedSign;

TypeChecking<BubblesCapturePhaseComposedResult, BubblesCapturePhaseComposedExpected, Test.Pass>;
