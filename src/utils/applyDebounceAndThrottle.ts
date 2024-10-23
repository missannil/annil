import type { Func } from "hry-types/src/Misc/Func";
import { debounce } from "./debounce";
import { throttle } from "./throttle";

export function applyDebounceAndThrottle(obj: Record<string, Func>) {
  function getDelay(suffix: string | undefined): number {
    return (suffix === undefined || isNaN(Number(suffix))) ? 300 : Number(suffix);
  }
  for (const [key, value] of Object.entries(obj)) {
    const suffix = key.split("_").at(-1);
    if (key.startsWith("debounced")) {
      obj[key] = debounce(value, getDelay(suffix));
      continue;
    }
    if (key.startsWith("throttled")) {
      obj[key] = throttle(value, getDelay(suffix));
    }
  }
}
