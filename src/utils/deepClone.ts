/**
 * 深度克隆 函数相同 原型一致
 */
export function deepClone<T>(value: T): T {
  if (typeof value !== "object" || value === null || value instanceof RegExp) {
    return value;
  }
  /* istanbul ignore next */
  const clone = (Array.isArray(value) ? [] : {}) as T;

  Object.setPrototypeOf(clone, Object.getPrototypeOf(value));

  /* istanbul ignore next */
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clone[key] = deepClone(value[key]);
    }
  }

  return clone;
}
