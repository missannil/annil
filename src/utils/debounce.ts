/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 防抖函数
 * 应用在输入框输入时，只有在输入完成并delay后,才会触发搜索
 * @param func
 * @param delay
 * @returns
 */
export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), delay);
  };
}
