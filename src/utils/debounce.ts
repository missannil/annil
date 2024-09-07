/**
 * 防抖函数
 * 注意 需要在tsconfig.json的types中添加"node",否则NodeJS.Timeout会报错
 * 例如 应用在输入框输入时，只有在输入完成并delay后,才会触发搜索,
 * @param func
 * @param delay
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), delay);
  };
}
