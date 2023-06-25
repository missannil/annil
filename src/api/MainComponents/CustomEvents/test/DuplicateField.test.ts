import { MainComponent } from "../../../..";

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
