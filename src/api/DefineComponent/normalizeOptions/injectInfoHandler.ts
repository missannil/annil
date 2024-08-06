import type { IInjectInfo } from "../../..";
import type { FinalOptionsOfComponent } from ".";
/**
 * 把injectInfo字段合并到finalOptionsForComponent
 * @remarks 规则：
 * 1. behaviors字段 push
 * 2. 对象字段 没有的话直接赋值，有的话Object.assign
 * @param finalOptionsForComponent
 * @param injectInfo
 * @returns finalOptionsForComponent
 */
function mergeOptions(
  finalOptionsForComponent: FinalOptionsOfComponent,
  injectInfo: IInjectInfo,
): FinalOptionsOfComponent {
  for (const key in injectInfo) {
    const injectVal = injectInfo[key];
    if (key in finalOptionsForComponent) {
      // @ts-ignore
      const originalVal = finalOptionsForComponent[key];
      switch (key) {
        case "behaviors":
          {
            // @ts-ignore behaviors 是数组类型
            finalOptionsForComponent[key].push(...injectVal);
          }
          break;

        default:
          {
            // @ts-ignore 覆盖目标
            finalOptionsForComponent[key] = Object.assign(originalVal, injectVal);
          }
          break;
      }
    } else {
      // @ts-ignore
      finalOptionsForComponent[key] = injectVal;
    }
  }

  return finalOptionsForComponent;
}
export function injectInfoHandler(
  finalOptionsForComponent: FinalOptionsOfComponent,
  injectInfo: IInjectInfo | undefined,
): FinalOptionsOfComponent {
  if (!injectInfo) return finalOptionsForComponent;

  return mergeOptions(finalOptionsForComponent, injectInfo);
}
