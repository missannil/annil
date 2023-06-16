import { MainComponent, type SpecificType } from "../../../src";

// ------------- 约束测试 ------------
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
// ------------------错误测试--------------
MainComponent({
  customEvents: {
    // @ts-expect-error 没有options,不要写为对象
    error: {
      detailType: String,
    },
  },
});
MainComponent({
  customEvents: {
    error1: {
      detailType: String,
      options: {
        bubbles: true,
        // @ts-expect-error 非法字段  composes 少了 s
        compose: true,
      },
    },
  },
});
MainComponent({
  customEvents: {
    error2: {
      detailType: String,
      options: {
        bubbles: true,
        // @ts-expect-error 非法字段  capturePhases 多了 s
        capturePhases: true,
      },
    },
  },
});
MainComponent({
  customEvents: {
    error2: {
      detailType: String,
      options: {
        bubbles: true,
        // @ts-expect-error 非法字段 otherField
        otherField: true,
      },
    },
  },
});

// -----------------与注入方法字段重复----------------

MainComponent({
  customEvents: {
    // @ts-expect-error  "⚠️与注入的methods字段重复⚠️"
    injectMethod: String,
  },
});
