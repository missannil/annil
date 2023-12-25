import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  isPage: true,
  lifetimes: {
    created() {
      // 模拟页面给 is和route假值。因为isPageCheck是根据is和route来的。
      this.is = this.route = "pages/index/index";
    },
  },
});
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  // subComponents:[]
});
export type $Index = typeof index;
