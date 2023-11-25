import { DefineComponent } from "../..";

//  RootComponentDoc的isPage类型为true时,必写path字段.
DefineComponent({
  path: "/pages/index/index",
  rootComponent: { isPage: true },
});

//  RootComponentDoc的isPage类型不为true时,必写name字段.
DefineComponent({
  name: "test",
  rootComponent: {},
});
