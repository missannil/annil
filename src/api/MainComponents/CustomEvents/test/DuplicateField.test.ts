import { MainComponent } from "../../../..";

// -----------------与注入方法字段重复----------------

MainComponent({
  customEvents: {
    // @ts-expect-error  "⚠️与注入的methods字段重复⚠️"
    injectMethod: String,
  },
});
// -----------------与events字段重复----------------

MainComponent({
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
