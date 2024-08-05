import { RootComponent } from "../..";

/**
 * 重复字段错误
 */
RootComponent()({
  events: {
    eventField() {
      void 0;
    },
  },
  customEvents: {
    customField: String,
  },
  methods: {
    // @ts-expect-error "⚠️与events字段重复⚠️"
    eventField() {
      void 0;
    },
    // @ts-expect-error "⚠️与customEvents字段重复⚠️"
    customField() {
      void 0;
    },
  },
});

/**
 * 2. 没有的字段报错
 */
RootComponent()({
  methods: {
    M1() {
      void 0;
    },

    M2() {
      // @ts-expect-error 没有的字段
      this.M3();
    },
  },
});
