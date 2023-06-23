import { type Test, TypeChecking } from "hry-types";
import type { SpecificType } from "../../../../common_types/SpecificType";
import type { GetFullEventDoc } from "../GetFullEventDoc";
import type {
  BubblesCapturePhaseComposedSign,
  BubblesComposedSign,
  BubblesSign,
  CapturePhaseComposedSign,
  CapturePhaseSign,
} from "../SignForCustomEvents";

// ------------测试GetFullEventDoc泛型------------

type FullEventList = [
  {
    detailType: StringConstructor;
    options: { bubbles: true };
  },
  {
    detailType: null;
    options: { capturePhase: true };
  },
  {
    detailType: SpecificType<"male" | "female">;
    options: { bubbles: true; composed: true };
  },
  {
    detailType: [StringConstructor, SpecificType<0 | 1 | 2>];
    options: { capturePhase: true; composed: true };
  },
  {
    detailType: [StringConstructor, SpecificType<0 | 1 | 2>, null];
    options: { bubbles: true; capturePhase: true; composed: true };
  },
];

type test0 = GetFullEventDoc<FullEventList[0]>;

TypeChecking<test0, string | BubblesSign, Test.Pass>;

type test1 = GetFullEventDoc<FullEventList[1]>;

TypeChecking<test1, CapturePhaseSign | null, Test.Pass>;

type test2 = GetFullEventDoc<FullEventList[2]>;

TypeChecking<test2, "male" | "female" | BubblesComposedSign, Test.Pass>;

type test3 = GetFullEventDoc<FullEventList[3]>;

TypeChecking<test3, string | 0 | 2 | 1 | CapturePhaseComposedSign, Test.Pass>;

type test4 = GetFullEventDoc<FullEventList[4]>;

TypeChecking<test4, string | 0 | 1 | 2 | BubblesCapturePhaseComposedSign | null, Test.Pass>;
