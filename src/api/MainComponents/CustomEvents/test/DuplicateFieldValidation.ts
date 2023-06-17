import { MainComponent } from "../../../..";

// -----------------与注入方法字段重复----------------

MainComponent({
  customEvents: {
    // @ts-expect-error  "⚠️与注入的methods字段重复⚠️"
    injectMethod: String,
  },
});
