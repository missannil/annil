import type { RootComponentType } from "../../../RootComponent/RootComponentType";
import { DefineComponent } from "../..";

DefineComponent({
  // @ts-expect-error  1 RootComponentDoc中isPage为true时 应该书写page字段
  name: "test",
  rootComponent: { isPage: true } satisfies RootComponentType,
});

DefineComponent({
  // @ts-expect-error 2 RootComponentDoc中isPage不为true时 应该书写name字段
  path: "/pages/index/index",
  rootComponent: {} satisfies RootComponentType,
});

DefineComponent({
  // @ts-expect-error 3 页面路径已'/'开头
  path: "pages/index/index",
  rootComponent: { isPage: true } satisfies RootComponentType,
});

DefineComponent({
  // @ts-expect-error 4 组件名不可为空
  name: "",
  rootComponent: {} satisfies RootComponentType,
});

DefineComponent({
  // @ts-expect-error 5 组件名不可包含下划线 _
  name: "ddd_ddd",
  rootComponent: {} satisfies RootComponentType,
});
