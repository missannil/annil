import type { Func } from "hry-types/src/Misc/_api";
import { isEmptyObject } from "../../../utils/isEmptyObject";
import type { FinalOptionsOfComponent, SameFuncOptions } from ".";
/**
 * 把函数配置放入一个配置中依次运行
 */
function _sameFuncOptionsHandle(config: Record<string, unknown>, configList: Record<string, Func[]>) {
  for (const key in configList) {
    config[key] = function(...args: unknown[]) {
      configList[key].forEach(ele => ele.call(this, ...args));
    };
  }
}
/**
 * 把函数列表配置放入一个配置中循环依次运行
 */
export function sameFuncOptionsHandle(
  finalOptionsForComponent: FinalOptionsOfComponent,
  isPage: boolean | undefined,
  funcOptions: SameFuncOptions,
) {
  if (isPage) {
    // 页面时 生命周期方法(即 on 开头的方法),(https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
    if (!isEmptyObject(funcOptions.pageLifetimes)) {
      _sameFuncOptionsHandle(finalOptionsForComponent.methods, funcOptions.pageLifetimes);
    }
  } else {
    // 组件时
    if (!isEmptyObject(funcOptions.pageLifetimes)) {
      _sameFuncOptionsHandle(finalOptionsForComponent.pageLifetimes, funcOptions.pageLifetimes);
    }
  }
  if (funcOptions.lifetimes) _sameFuncOptionsHandle(finalOptionsForComponent.lifetimes, funcOptions.lifetimes);

  if (funcOptions.watch) _sameFuncOptionsHandle(finalOptionsForComponent.watch, funcOptions.watch);
}
