import type { Func } from "hry-types/src/Misc/Func";
import type { ComponentOptions } from "../api/DefineComponent";
import { deepClone } from "./deepClone";

/**
 * onLoad生命周期劫持函数
 */
/* istanbul ignore next */
export function onLoadHijack(
  options: ComponentOptions,
  before: Func[],
  after: Func[] = [],
) {
  options.methods ||= {};

  const cloneOpt = deepClone(options);
  const originalOnLoad: Func | undefined = options.methods.onLoad;

  options.methods.onLoad = function(props: unknown) {
    before.forEach((func) => {
      func.call(this, props, cloneOpt);
    });

    originalOnLoad?.call(this, props);

    after.forEach((func) => {
      func.call(this, props, cloneOpt);
    });
  };
}
