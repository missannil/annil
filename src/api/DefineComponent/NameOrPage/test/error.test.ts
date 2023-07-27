import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { DefineComponent } from "../..";

DefineComponent({
  // @ts-expect-error RootComponentDoc中isPage为true时 应该书写page字段
  name: "test",
  rootComponent: { isPage: true } satisfies RootComponentDoc,
});

DefineComponent({
  // @ts-expect-error RootComponentDoc中isPage不为true时 应该书写name字段
  path: "/pages/index/index",
  rootComponent: {} satisfies RootComponentDoc,
});

DefineComponent({
  // @ts-expect-error 页面路径已'/'开头
  path: "pages/index/index",
  rootComponent: { isPage: true } satisfies RootComponentDoc,
});

DefineComponent({
  // @ts-expect-error 组件名不可为空
  name: "",
  rootComponent: {} satisfies RootComponentDoc,
});
