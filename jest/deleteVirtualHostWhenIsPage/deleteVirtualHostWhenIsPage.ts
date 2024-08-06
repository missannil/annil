import { DefineComponent, RootComponent } from "../../src";

import { tempObj } from "./deleteVirtualHostWhenIsPage.test";

const rootComponent = RootComponent()({
  isPage: true,

  options: {
    virtualHost: true, // 模拟注入的virtualHost字段
  },
  lifetimes: {
    beforeCreate(options) {
      tempObj.result = options.options.virtualHost ?? true;
    },
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
void index;
