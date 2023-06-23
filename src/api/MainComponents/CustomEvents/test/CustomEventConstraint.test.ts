import type { SpecificType } from "../../../..";
import { MainComponent } from "../..";

// -------------normal demo ------------
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
    capturePhase: {
      detailType: Boolean,
      options: {
        capturePhase: true,
      },
    },
    bubbles_composed: {
      detailType: Boolean,
      options: {
        bubbles: true,
        composed: true,
      },
    },
    capturePhase_composed: {
      detailType: Boolean,
      options: {
        capturePhase: true,
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
    // @ts-expect-error options 没有options字段,不要写对象形式。
    error1: {
      detailType: Boolean,
    },
    // @ts-expect-error options 不可以为空对象 无意义
    error2: {
      detailType: Boolean,
      options: {},
    },
    // @ts-expect-error false字段不要写 默认false
    error3: {
      detailType: Boolean,
      options: { bubbles: false },
    },
    // @ts-expect-error false字段不要写 默认false
    error4: {
      detailType: Boolean,
      options: { capturePhase: false },
    },
    // @ts-expect-error composed字段不可以单独开启,必须存在 bubbles或capturePhase为true时
    error5: {
      detailType: Boolean,
      options: { composed: true },
    },
  },
});
