/**
 * 防抖函数
 * 例如 在input框输入内容时,只有输入停止一段时间(wait)后,才会触发输入事件.
 * @param func
 * @param wait
 * @returns
 */
/* istanbul ignore next  */
export function debounce<TArgs extends unknown[]>(
  func: (...args: TArgs) => unknown,
  wait = 300,
): (...args: TArgs) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function(this: unknown, ...args: TArgs): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func.call(this, ...args), wait);
  };
}
