/**
 * 判断一个值是否为空对象 `{}`
 */
export function isEmptyObject(obj: object) {
  if (
    typeof obj !== "object" || obj === null || Array.isArray(obj) || obj instanceof Set || obj instanceof Map
    || obj instanceof WeakSet || obj instanceof WeakMap
  ) {
    return false;
  }

  return Reflect.ownKeys(obj).length === 0;
}
