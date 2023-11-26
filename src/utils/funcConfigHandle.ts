import type { Func } from "hry-types/src/Misc/_api";
import type { ComponentOptions, FuncConfig } from "../api/DefineComponent";
/**
 * 把函数配置放入一个配置中依次运行
 */
function _funcConfigHandle(methodsConfig: object, configList: Record<string, Func[]>) {
  for (const key in configList) {
    methodsConfig[key] = function(...args: unknown[]) {
      configList[key].forEach(ele => ele.call(this, ...args));
    };
  }
}

export function funcConfigHandle(
  componentOptions: ComponentOptions,
  isPage: boolean | undefined,
  funcConfig: FuncConfig,
) {
  if (isPage) {
    // 页面时 生命周期方法(即 on 开头的方法),(https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
    // 测试框架无法测试page特性
    funcConfig.pageLifetimes && _funcConfigHandle(componentOptions.methods ||= {}, funcConfig.pageLifetimes);
  } else {
    // 组件时
    funcConfig.pageLifetimes && _funcConfigHandle(componentOptions.pageLifetimes ||= {}, funcConfig.pageLifetimes);
  }
  funcConfig.lifetimes && _funcConfigHandle(componentOptions.lifetimes ||= {}, funcConfig.lifetimes);

  funcConfig.watch && _funcConfigHandle(componentOptions.watch ||= {}, funcConfig.watch);
}
