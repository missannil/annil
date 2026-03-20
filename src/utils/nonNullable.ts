import type { IfContains } from "hry-types/src/Any/IfContains";

/**
 * 使用此函数代替!断言
 * 支持可选的第二个参数作为错误消息
 * @param value 类型中必须包含 null 或 undefined
 * @param message 可选，抛出错误时的消息
 * @returns 去除 null 和 undefined 后的类型
 */
export function nonNullable<T>(
  value: IfContains<T, null | undefined, T, "参数类型必须包含 null 或 undefined">,
  message?: string,
): NonNullable<T> {
  /* istanbul ignore next  */
  if (value === null || value === undefined) {
    throw new Error(message ?? `${value} should not be null or undefined`);
  }

  return value as NonNullable<T>;
}
