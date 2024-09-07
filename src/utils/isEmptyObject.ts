/**
 * 判断一个值是否为空的普通对象 `{}`
 * 有symblo和非枚举属性的对象会返回 `false`
 */
export function isEmptyObject(value: unknown): boolean {
  if (
    typeof value !== "object" || value === null || Array.isArray(value) || value instanceof Set || value instanceof Map
    || value instanceof WeakSet || value instanceof WeakMap
  ) {
    return false;
  }

  return Reflect.ownKeys(value).length === 0;
}
