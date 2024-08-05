import type { IfContains } from "hry-types/src/Any/IfContains";

export function assertNonNullable<T>(
  value: IfContains<T, null | undefined, T, "参数类型必须包含 null 或 undefined">,
): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(`${value} should not be null or undefined`);
  }

  return value as NonNullable<T>;
}
