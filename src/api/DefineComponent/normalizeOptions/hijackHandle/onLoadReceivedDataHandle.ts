/**
 * 原生Component会对传入的对象字段匹配的properties字段setData赋值。不符合字段或Page时不会赋值。
 * 此函数为给实例setData赋值,默认传递值与properties相符(ts类型安全)。
 * @param option - 传入onLoad的参数 有以下两种可能
 * 1. 使用wx.navigateTo传值的。这种情况无内置字段 option[INNERMARKER.url] 等于 undefined
 * 2. 使用插件提供的navigateTo传值。这种情况 INNERMARKER.url被load周期劫持函数解码后赋值INNERMARKER.url字段为本身,即option[INNERMARKER.url] 等于 INNERMARKER.url
 */

import { INNERMARKER } from "../../../../utils/InnerMarker";
import type { PageInstance } from "../../../RootComponent/Instance/RootComponentInstance";

/* istanbul ignore next miniprogram-simulate(当前版本 1.6.1) 无法测试页面生命周期 */
export function onLoadReceivedDataHandle(
  this: PageInstance,
  option: Record<typeof INNERMARKER.url, string>,
) {
  const innerData: string | undefined = option[INNERMARKER.url];

  // 情况1为undefined,2为INNERMARKER.url有值但不是本身,说明是老框架。3所以innerData等于 INNERMARKER.url即有组件配置了load(新框架在pageLifetimes.load中提前解析了)
  if (innerData === undefined) return;
  if (innerData !== INNERMARKER.url) {
    // 需要情况2 需要解析
    const decodeOption = JSON.parse(decodeURIComponent(innerData));
    for (const key in decodeOption) {
      option[key] = decodeOption[key];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete option[INNERMARKER.url];

  this.setData(option);
}
