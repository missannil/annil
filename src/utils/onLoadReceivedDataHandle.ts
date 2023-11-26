import type { PageInstance } from "../api/RootComponent/Instance/RootComponentInstance";
import { INNERMARKER } from "./InnerMarker";
/**
 * 对页面onLoad的参数data处理
 * 1. 多余字段检测
 * 2. 少传字段报错
 * 3. 类型错误报错
 * 针对通过 navigateTo传过来的数据解析
 * @param option - option中的url是拼接了encodeURIComponent转码的data对象的,key为INNERMARKER.url
 */
export function onLoadReceivedDataHandle(
  this: PageInstance,
  option: Record<typeof INNERMARKER.url, string>,
) {
  const innerData: string | undefined = option[INNERMARKER.url];
  // 未使用自定义的navigateTo
  if (innerData === undefined) return;
  const optionData = JSON.parse(decodeURIComponent(innerData));

  // 使用navigateTo
  for (const key in optionData) {
    option[key] = optionData[key];
  }

  // setData会触发计算属性 继承属性等 。
  this.setData(option as any);

  delete option[INNERMARKER.url];

  delete this.data[INNERMARKER.url];
}
