import { DefineComponent, RootComponent } from "../../src";

const rootComponent = RootComponent()({
  isPage: true, // 故意写错了
  lifetimes: {
    created() {
      // 模拟页面给 is 因为path是根据is验证的。
      // @ts-ignore
      this.is = this.route = "pages/index/index";
      console.log(this.is);
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const index = DefineComponent({
  path: "/pages/index/in1dex", // 故意写错了
  rootComponent,
});
export type $Index = typeof index;
