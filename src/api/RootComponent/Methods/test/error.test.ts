import { RootComponent } from "../..";

/**
 * 1 重复字段错误
 */
RootComponent()({
  events: {
    eventField() {
      1;
    },
  },
  customEvents: {
    customField: String,
  },
  methods: {
    // @ts-expect-error "⚠️与events字段重复⚠️"
    eventField() {
      1;
    },
    // @ts-expect-error "⚠️与customEvents字段重复⚠️"
    customField() {
      2;
    },
  },
});

/**
 * 2. 没有的字段报错
 */
RootComponent()({
  methods: {
    M1() {
      1;
    },

    M2() {
      // @ts-expect-error 没有的字段
      this.M3();
    },
  },
});
