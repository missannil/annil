/**
 * 针对通过 navigateTo传过来的数据对组件load周期传入数据解析
 * @param option - option中的url是拼接了encodeURIComponent转码的data对象的,key为INNERMARKER.url
 */

import { INNERMARKER } from "../../../../utils/InnerMarker";
import type { PageInstance } from "../../../RootComponent/Instance/RootComponentInstance";

/* istanbul ignore next miniprogram-simulate(当前版本 1.6.1) 无法测试load */
export function loadReceivedDataHandle(
  this: PageInstance,
  option: Record<typeof INNERMARKER.url, string>,
) {
  const innerData: string | undefined = option[INNERMARKER.url];
  // 未使用自定义的navigateTo
  if (innerData === undefined) return;
  // 使用navigateTo API
  const decodeOption = JSON.parse(decodeURIComponent(innerData));

  for (const key in decodeOption) {
    option[key] = decodeOption[key];
  }
  // 给onLoad劫持函数一个标记,判断在新框架下已经被解析过了
  option[INNERMARKER.url] = INNERMARKER.url;
}
