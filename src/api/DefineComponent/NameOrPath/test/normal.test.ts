import { DefineComponent } from "../..";

//  1. RootComponentDoc的isPage类型为true时,必写path字段.
DefineComponent({
  path: "/pages/index/index",
  rootComponent: { isPage: true },
});

// 2. RootComponentDoc的isPage类型不为true时,必写name字段.
DefineComponent({
  name: "test",
  rootComponent: {},
});
