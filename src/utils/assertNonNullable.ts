import type { IfContains } from "hry-types/src/Any/IfContains";

/**
 * 使用此函数代替!断言
 * @param value 类型中必须包含 null 或 undefined
 * @returns 去除 null 和 undefined 后的类型
 */
export function assertNonNullable<T>(
  value: IfContains<T, null | undefined, T, "参数类型必须包含 null 或 undefined">,
): NonNullable<T> {
  /* istanbul ignore next  */
  if (value === null || value === undefined) {
    throw new Error(`${value} should not be null or undefined`);
  }

  return value as NonNullable<T>;
}
