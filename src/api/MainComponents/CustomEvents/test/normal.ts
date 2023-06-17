import type { SpecificType } from "../../../..";
import { MainComponent } from "../..";

// ------------- demo ------------
MainComponent({
  customEvents: {
    num: Number,
    str: String as SpecificType<"male" | "female">,
    union: [String, Number as SpecificType<0 | 1 | 2>],
    isNull: null,
    bubbles: {
      detailType: Boolean,
      options: {
        bubbles: true,
      },
    },
    bubbles_composed: {
      detailType: Boolean,
      options: {
        bubbles: true,
        composed: true,
      },
    },
    bubbles_composed_capturePhase: {
      detailType: Boolean,
      options: {
        bubbles: true,
        composed: true,
        capturePhase: true,
      },
    },
  },
});
