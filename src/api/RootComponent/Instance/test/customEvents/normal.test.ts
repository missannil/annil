import { Checking, type Test } from "hry-types";
import type { SpecificType } from "../../../../..";
import { RootComponent } from "../../..";
RootComponent()({
  customEvents: {
    str: String,
    num: Number as SpecificType<1 | 2>,
    union: [String as SpecificType<"male" | "femal">, Number],
    null: null,
    bubbles: {
      detailType: String,
      options: {
        bubbles: true,
      },
    },
    capturePhase: {
      detailType: Number,
      options: {
        capturePhase: true,
      },
    },
    bubblesComposed: {
      detailType: Number,
      options: {
        bubbles: true,
        composed: true,
      },
    },
    capturePhaseComposed: {
      detailType: Number,
      options: {
        capturePhase: true,
        composed: true,
      },
    },
    bubblesCapturePhaseComposed: {
      detailType: null,
      options: {
        bubbles: true,
        capturePhase: true,
        composed: true,
      },
    },
  },
  methods: {
    M1() {
      Checking<(detail: string) => void, typeof this.str, Test.Pass>;

      Checking<(detail: 1 | 2) => void, typeof this.num, Test.Pass>;

      Checking<(detail: "male" | "femal" | number) => void, typeof this.union, Test.Pass>;

      Checking<() => void, typeof this.null, Test.Pass>;

      Checking<(detail: string) => void, typeof this.str, Test.Pass>;

      Checking<(detail: number) => void, typeof this.capturePhase, Test.Pass>;

      Checking<(detail: number) => void, typeof this.bubblesComposed, Test.Pass>;

      Checking<(detail: number) => void, typeof this.capturePhaseComposed, Test.Pass>;

      Checking<() => void, typeof this.bubblesCapturePhaseComposed, Test.Pass>;
    },
  },
});
