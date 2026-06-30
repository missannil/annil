import { observable } from "mobx";
import { DefineComponent, RootComponent } from "../../../src";
import { checkData } from "./duplicate.test";

const customTheme = observable({
  theme: "light",
});

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
  store: {
    // 组件自身store覆盖注入store
    injectTheme: () => customTheme.theme,
  },
  methods: {
    // 组件自身方法覆盖注入方法
    injectMethodA() {
      return "overridden_by_component" as const;
    },
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
