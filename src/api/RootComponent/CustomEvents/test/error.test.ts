import { RootComponent } from "../..";

/**
 * 1 错误的字段类型
 */
RootComponent()({
  customEvents: {
    // @ts-expect-error options 没有options字段时无需写对象形式,应简写`error1:Boolean`。
    error1: {
      detail: Boolean,
    },
    // @ts-expect-error options 不可以为空对象 无意义
    error2: {
      detail: Boolean,
      options: {},
    },
    // @ts-expect-error false字段不要写 默认就为false
    error3: {
      detail: Boolean,
      options: { bubbles: false },
    },
    // @ts-expect-error false 字段不要写 默认false
    error4: {
      detail: Boolean,
      options: { capturePhase: false },
    },
    // @ts-expect-error composed字段不可以单独开启,必须存在 bubbles或capturePhase字段为true时
    error5: {
      detail: Boolean,
      options: { composed: true },
    },
  },
});

/**
 * 2 重复字段
 */
RootComponent()({
  events: {
    aaa() {
      1;
    },
  },
  customEvents: {
    // @ts-expect-error  "⚠️与events字段重复⚠️"
    aaa: String,
  },
});

/**
 * 3.1 非法字段验证
 */
RootComponent()({
  customEvents: {
    error1: {
      detail: String,
      options: {
        bubbles: true,
        // @ts-expect-error 非法字段  composed 少了d
        compose: true,
      },
    },
  },
});

/**
 * 3.2 非法字段验证
 */
RootComponent()({
  customEvents: {
    error2: {
      detail: String,
      options: {
        bubbles: true,
        // @ts-expect-error 非法字段  capturePhases 多了 s
        capturePhases: true,
      },
    },
  },
});

/**
 * 4 重复字段与非法同时存在时 只报其一错误(非法),确保报错位置在字段而非customEvents位置。
 */
RootComponent()({
  events: {
    aaa() {
      1;
    },
  },
  customEvents: {
    bbb: {
      detail: null,
      options: {
        // @ts-expect-error 非法字段
        bubbleds: false,
      },
    },
    aaa: String,
  },
});
