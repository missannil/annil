import { MainComponent } from "../..";

/**
 * 重复字段验证
 */
MainComponent({
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
