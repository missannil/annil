import { type Test, TypeChecking } from "hry-types";
import type { GetCustomEventDoc } from "../GetCustomEventDoc";

import type { SpecificType } from "../../../..";
import {
  type BubblesCapturePhaseComposedSign,
  type BubblesComposedSign,
  type BubblesSign,
  type CapturePhaseComposedSign,
  type CapturePhaseSign,
} from "../SignForCustomEvents";

type CustomEventDoc = GetCustomEventDoc<{
  a: StringConstructor;
  b: [NumberConstructor, SpecificType<"male" | "femal">];
  c: null;
  bubbles: {
    detailType: StringConstructor;
    options: { bubbles: true };
  };
  capturePhase: {
    detailType: BooleanConstructor;
    options: { capturePhase: true };
  };
  bubblesComposed: {
    detailType: BooleanConstructor;
    options: { bubbles: true; composed: true };
  };
  capturePhaseComposed: {
    detailType: BooleanConstructor;
    options: { capturePhase: true; composed: true };
  };
  bubblesCapturePhaseComposed: {
    detailType: StringConstructor;
    options: {
      bubbles: true;
      capturePhase: true;
      composed: true;
    };
  };
}>;

TypeChecking<
  CustomEventDoc,
  {
    a: string;
    b: number | "male" | "femal";
    c: null;
    bubbles: string | BubblesSign;
    capturePhase: boolean | CapturePhaseSign;
    bubblesComposed: boolean | BubblesComposedSign;
    capturePhaseComposed: boolean | CapturePhaseComposedSign;
    bubblesCapturePhaseComposed: string | BubblesCapturePhaseComposedSign;
  },
  Test.Pass
>;
