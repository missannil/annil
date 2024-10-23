/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback = (...args: any[]) => any;

/**
 *  节流函数
 *  规定时间内只触发第一次 例如点击按钮
 * @param callback 回调函数
 * @param interval 单位毫秒
 * @returns
 */
/* istanbul ignore next  */
export function throttle<F extends Callback>(callback: F, interval = 200): (...args: Parameters<F>) => void {
  let lastCall = 0;

  return function(this: unknown, ...args: Parameters<F>) {
    const now = Date.now();

    if (now - lastCall >= interval) {
      lastCall = now;

      callback.call(this, ...args);
    }
  };
}
