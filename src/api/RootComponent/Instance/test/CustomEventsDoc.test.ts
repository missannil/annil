import { Checking, type Test } from "hry-types";
import type { DetailedType } from "../../../..";
import { RootComponent } from "../..";
RootComponent()({
  customEvents: {
    str: String,
    num: Number as DetailedType<1 | 2>,
    union: [String as DetailedType<"male" | "femal">, Number],
    null: null,
    undefined: undefined,
    bubbles: {
      detail: String,
      options: {
        bubbles: true,
      },
    },
    capturePhase: {
      detail: Number,
      options: {
        capturePhase: true,
      },
    },
    bubblesComposed: {
      detail: Number,
      options: {
        bubbles: true,
        composed: true,
      },
    },
    capturePhaseComposed: {
      detail: Number,
      options: {
        capturePhase: true,
        composed: true,
      },
    },
    bubblesCapturePhaseComposed: {
      detail: null,
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

      Checking<(detail: null) => void, typeof this.null, Test.Pass>;

      Checking<() => void, typeof this.undefined, Test.Pass>;

      Checking<(detail: string) => void, typeof this.str, Test.Pass>;

      Checking<(detail: number) => void, typeof this.capturePhase, Test.Pass>;

      Checking<(detail: number) => void, typeof this.bubblesComposed, Test.Pass>;

      Checking<(detail: number) => void, typeof this.capturePhaseComposed, Test.Pass>;

      Checking<(detail: null) => void, typeof this.bubblesCapturePhaseComposed, Test.Pass>;
    },
  },
});
