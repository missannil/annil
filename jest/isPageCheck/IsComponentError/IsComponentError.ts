import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  isPage: true, // 故意写错 1
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const compA = DefineComponent({
  path: "/compA", // 故意写错 2
  rootComponent,
  // subComponents:[]
});
export type $CompA = typeof compA;
