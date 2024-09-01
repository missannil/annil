/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Instance } from "../api/RootComponent/Instance/RootComponentInstance";
import { debounce } from "../utils/debounce";
import { throttle } from "../utils/throttle";

export const BthrottleDebounce = Behavior({
  lifetimes: {
    created(this: Instance) {
      const __throttleDebounce__ = this.data.__throttleDebounce__;
      if (!__throttleDebounce__) return;
      const debounceConfig = __throttleDebounce__.debounce;
      if (debounceConfig) {
        for (const key in debounceConfig) {
          const _this = this as any;
          _this[key] = debounce(_this[key].bind(this), debounceConfig[key]);
        }
      }
      const throttleConfig = __throttleDebounce__.throttle;
      if (throttleConfig) {
        for (const key in throttleConfig) {
          const _this = this as any;
          _this[key] = throttle(_this[key].bind(this), throttleConfig[key]);
        }
      }
      delete this.data.__throttleDebounce__;
    },
  },
});
