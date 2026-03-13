/**
 *  节流函数
 *  规定时间内只触发第一次 例如点击按钮
 * @param callback 回调函数
 * @param interval 单位毫秒
 * @returns
 */
/* istanbul ignore next  */
export function throttle<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  interval = 200,
): (...args: TArgs) => void {
  let lastCall = 0;

  return function(this: unknown, ...args: TArgs) {
    const now = Date.now();

    if (now - lastCall >= interval) {
      lastCall = now;

      callback.call(this, ...args);
    }
  };
}
