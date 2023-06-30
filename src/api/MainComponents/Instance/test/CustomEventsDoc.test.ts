import { ValueChecking } from "hry-types";
import type { SpecificType } from "../../../../common_types/SpecificType";
import { MainComponent } from "../..";

MainComponent({
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
      ValueChecking<(detail: string) => void>()(this.str);

      ValueChecking<(detail: 1 | 2) => void>()(this.num);

      ValueChecking<(detail: "male" | "femal" | number) => void>()(this.union);

      ValueChecking<() => void>()(this.null);

      ValueChecking<(detail: string) => void>()(this.bubbles);

      ValueChecking<(detail: number) => void>()(this.capturePhase);

      ValueChecking<(detail: number) => void>()(this.bubblesComposed);

      ValueChecking<(detail: number) => void>()(this.capturePhaseComposed);

      ValueChecking<() => void>()(this.bubblesCapturePhaseComposed);
    },
  },
});
