import { DefineComponent, RootComponent } from "../../../src";
import { checkData } from "./duplicate.test";

const rootComponent = RootComponent()({
  options: {
    addGlobalClass: false,
    multipleSlots: false,
    pureDataPattern: /^__/,
    virtualHost: false,
  },
  data: {
    injectStr: "changed",
  },
  lifetimes: {
    beforeCreate(opt) {
      checkData.options = opt.options;

      checkData.data = opt.data;

      checkData.behaviors = opt.behaviors;
    },
  },
});

DefineComponent({
  name: "injectNormal",
  rootComponent,
});
