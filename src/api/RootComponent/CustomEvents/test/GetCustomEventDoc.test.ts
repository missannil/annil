import { Checking, type Test } from "hry-types";
import type { GetCustomEventDoc } from "../GetCustomEventDoc";

import {
  type BubblesCapturePhaseComposedExpected,
  type BubblesCapturePhaseExpected,
  type BubblesComposedExpected,
  type bubblesExpected,
  type CapturePhaseComposedExpected,
  type CapturePhaseExpected,
} from "./GetFullEventDoc.test";
import {
  type ListExpected,
  type NullExpected,
  type ObjExpected,
  type StrExpected,
  type UnionStrExpected,
} from "./GetShortEventDoc.test";
import { type mock_customEvents } from "./normal.test";

type Mock_CustomEventsDoc = GetCustomEventDoc<typeof mock_customEvents>;

export type Mock_CustomEventsDocExpected = {
  str: StrExpected;
  null: NullExpected;
  nothing: undefined;
  unionStr: UnionStrExpected;
  union: ListExpected;
  obj: ObjExpected;
  bubbles: bubblesExpected;
  capturePhase: CapturePhaseExpected;
  bubbles_capturePhase: BubblesCapturePhaseExpected;
  bubbles_composed: BubblesComposedExpected;
  capturePhase_composed: CapturePhaseComposedExpected;
  bubbles_capturePhase_composed: BubblesCapturePhaseComposedExpected;
};

void Checking<Mock_CustomEventsDoc, Mock_CustomEventsDocExpected, Test.Pass>;
