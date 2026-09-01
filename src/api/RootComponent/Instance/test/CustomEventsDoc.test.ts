/* eslint-disable @typescript-eslint/no-unused-expressions */

import { type DetailedType, typeEqual } from "../../../..";
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
      typeEqual<(detail: string) => void, typeof this.str>;

      typeEqual<(detail: 1 | 2) => void, typeof this.num>;

      typeEqual<(detail: "male" | "femal" | number) => void, typeof this.union>;

      typeEqual<(detail: null) => void, typeof this.null>;

      typeEqual<() => void, typeof this.undefined>;

      typeEqual<(detail: string) => void, typeof this.str>;

      typeEqual<(detail: number) => void, typeof this.capturePhase>;

      typeEqual<(detail: number) => void, typeof this.bubblesComposed>;

      typeEqual<(detail: number) => void, typeof this.capturePhaseComposed>;

      typeEqual<(detail: null) => void, typeof this.bubblesCapturePhaseComposed>;
    },
  },
});
