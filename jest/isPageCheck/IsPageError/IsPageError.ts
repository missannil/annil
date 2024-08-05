import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  isPage: false, // 故意写错了
  lifetimes: {
    created() {
      // 模拟页面给 is和route假值。因为isPageCheck是根据is和route来的。
      // @ts-ignore
      this.is = this.route = "pages/index/index";
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  name: "/pages/index/index", // 故意写错了
  rootComponent,
  // subComponents:[]
});
export type $Index = typeof index;
