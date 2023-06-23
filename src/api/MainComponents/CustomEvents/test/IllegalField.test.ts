import { MainComponent } from "../..";

/**
 * 非法字段验证
 */
MainComponent({
  customEvents: {
    // @ts-expect-error 约束报错 缺少options字段.应写为 error:String
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
