/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback = (...args: any[]) => any;
/**
 * 防抖函数
 * 注意 需要在tsconfig.json的types中添加"node",否则NodeJS.Timeout会报错
 * 例如 在input框输入内容时,只有输入停止一段时间(wait)后,才会触发输入事件.
 * @param func
 * @param wait
 * @returns
 */
/* istanbul ignore next  */
export function debounce<F extends Callback>(func: F, wait = 300): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function(this: unknown, ...args: Parameters<F>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func.call(this, ...args), wait);
  };
}
