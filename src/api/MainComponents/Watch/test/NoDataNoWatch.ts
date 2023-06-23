import { MainComponent } from "../..";

// 无可监控data字段(包含注入的动态data字段),会报错.
MainComponent({
  watch: {} as never,
});
