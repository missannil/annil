import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent } from "..";
import { disposeStore } from "../handleStore/disposeStore";
import { initStore } from "../handleStore/initStore";
import { initComputed } from "../initComputed";
import { computedUpdater } from "../initComputed/computedUpdater";
import { addDetachedData } from "./addDetachedData";
import { hijack } from "./hijack";
import { isPageCheck } from "./isPageCheck";
import { loadReceivedDataHandle } from "./loadReceivedDataHandle";
import { onLoadReceivedDataHandle } from "./onLoadReceivedDataHandle";
import { pagePathCheck } from "./pagePathCheck";

export function hijackHandle(
  finalOptionsForComponent: FinalOptionsOfComponent,
  isPage: boolean | undefined,
  path: string | undefined,
) {
  // 对页面传入参数进行处理 老框架劫持页面methods.onLoad,新框架劫持页面pageLifetimes.load
  if (finalOptionsForComponent.isPage) {
    hijack(finalOptionsForComponent.pageLifetimes, "load", [loadReceivedDataHandle]);
  }

  hijack(finalOptionsForComponent.methods, "onLoad", [onLoadReceivedDataHandle]);
  hijack(finalOptionsForComponent.observers, "**", [
    computedUpdater,
  ]);

  hijack(
    finalOptionsForComponent.lifetimes,
    "attached",
    [
      // 验证isPage字段是否配置正确
      isPageCheck(isPage),
      // 验证页面的Path字段是否配置正确
      pagePathCheck(path),
      initStore(finalOptionsForComponent.store),
      // 计算属性的初始化应该在store初始化之后,因为计算属性可能依赖store。
      initComputed(finalOptionsForComponent.computed, finalOptionsForComponent.watch),
      function(this: Instance) {
        const observerhandlers = this.data.__oberverHandler__;
        if (observerhandlers) {
          for (const observerhandler of observerhandlers) {
            observerhandler.call(this);
          }
          Reflect.deleteProperty(this.data, "__oberverHandler__");
        }
      },
    ],
    [addDetachedData],
  );
  hijack(
    finalOptionsForComponent.lifetimes,
    "detached",
    [disposeStore],
  );
}
