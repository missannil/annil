import type { Func } from "hry-types/src/Misc/Func";
import { debounce } from "./debounce";
import { throttle } from "./throttle";

/**
 * 对象中的函数应用防抖和节流
 * 规则 函数字段已下划线开始的后缀 如 xxx_debounced500 或 sub_xxx_throttled,无效后缀如 _debouncedxxx 不会被处理
 * @param obj
 */
export function applyDebounceAndThrottle(obj: Record<string, Func>) {
  for (const [key, value] of Object.entries(obj)) {
    if (!key.includes("_")) continue;
    const suffix = key.split("_").at(-1) as string;

    const remaining = suffix.slice(9);
    const delay = remaining === "" ? 300 : Number(remaining);

    if (suffix.startsWith("debounced")) {
      if (!isNaN(delay)) {
        obj[key] = debounce(value, delay);
      }
      continue;
    }

    if (suffix.startsWith("throttled")) {
      if (!isNaN(delay)) {
        obj[key] = throttle(value, delay);
      }
    }
  }
}
