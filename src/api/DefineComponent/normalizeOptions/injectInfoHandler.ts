import type { IInjectInfo } from "../../..";
import type { InjectKey } from "../../InstanceInject/instanceConfig";
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
    const isInjectKey = key as InjectKey;
    const injectVal = injectInfo[isInjectKey];

    if (key in finalOptionsForComponent) {
      const renamedKey = key as keyof FinalOptionsOfComponent;
      const originalVal = finalOptionsForComponent[renamedKey];
      switch (isInjectKey) {
        case "behaviors":
          finalOptionsForComponent["behaviors"].push(...injectVal as string[]);

          break;

        default:
          // @ts-ignore
          finalOptionsForComponent[renamedKey] = Object.assign(originalVal, injectVal);

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
