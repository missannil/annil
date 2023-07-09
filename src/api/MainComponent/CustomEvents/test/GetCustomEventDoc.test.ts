import { type Test, TypeChecking } from "hry-types";

import type { CustomEventConstraint } from "../CustomEventConstraint";
import type { GetCustomEventDoc } from "../GetCustomEventDoc";
import { mock_fullCustomEvents, mock_shorCustomEvents } from "./CustomEventConstraint.test";
import {
  type BubblesCapturePhaseComposedExpected,
  type BubblesCapturePhaseExpected,
  type BubblesComposedExpected,
  type bubblesExpected,
  type CapturePhaseComposedExpected,
  type CapturePhaseExpected,
} from "./GetFullEventDoc.test";
import { type ListExpected, type NullExpected, type StrExpected, type UnionStrExpected } from "./GetShortEventDoc.test";

const mock_customEvents = {
  ...mock_shorCustomEvents,
  ...mock_fullCustomEvents,
} satisfies CustomEventConstraint;

type CustomEventsResult = GetCustomEventDoc<typeof mock_customEvents>;

export type CustomEventsExpected = {
  str: StrExpected;
  null: NullExpected;
  unionStr: UnionStrExpected;
  list: ListExpected;
  bubbles: bubblesExpected;
  capturePhase: CapturePhaseExpected;
  bubbles_capturePhase: BubblesCapturePhaseExpected;
  bubbles_composed: BubblesComposedExpected;
  capturePhase_composed: CapturePhaseComposedExpected;
  bubbles_capturePhase_composed: BubblesCapturePhaseComposedExpected;
};

TypeChecking<CustomEventsResult, CustomEventsExpected, Test.Pass>;
