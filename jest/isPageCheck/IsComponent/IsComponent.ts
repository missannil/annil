import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  isPage: false,
  data: {
    result: true,
  },
  lifetimes: {
    created() {
      // 模拟组件给 is 一个路径。因为isPageCheck是根据is和route来的。
      this.is = "components/compA/compA";
    },
  },
});
const compA = DefineComponent({
  name: "compA",
  rootComponent,
  // subComponents:[]
});
export type $CompA = typeof compA;
