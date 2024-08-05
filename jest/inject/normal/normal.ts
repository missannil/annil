import { DefineComponent, RootComponent } from "../../../src";
import { checkData } from "./normal.test";

const rootComponent = RootComponent()({
  lifetimes: {
    beforeCreate(opt) {
      checkData.options = opt.options;

      checkData.data = opt.data;
    },
  },
});

DefineComponent({
  name: "injectNormal",
  rootComponent,
});
