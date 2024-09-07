/**
 * 数组和普通对象的深度克隆,原型相同
 */
export function deepClone<T>(value: T): T {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  const clone = (Array.isArray(value) ? [] : {}) as T;

  Object.setPrototypeOf(clone, Object.getPrototypeOf(value));

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clone[key] = deepClone(value[key]);
    }
  }

  return clone;
}
