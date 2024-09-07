type PlainObject = Record<string, unknown>;
// 非null的对象类型
function isNonNullObject(value: unknown): value is PlainObject {
  return value !== null && typeof value === "object";
}

export function deepEqual(value1: unknown, value2: unknown): boolean {
  // 两个非对象类型相等或同引用对象的情况。
  if (Object.is(value1, value2)) {
    return true;
  }
  // 有一个不是非空对象,返回false。
  if (!isNonNullObject(value1) || !isNonNullObject(value2)) {
    return false;
  }
  // 到此两个值都是对象类型。
  const value1Keys = Object.keys(value1);
  // 使用Set提高查找效率。
  const value2KeysSet = new Set(Object.keys(value2));

  if (value1Keys.length !== value2KeysSet.size) {
    return false;
  }

  for (const key of value1Keys) {
    if (!value2KeysSet.has(key) || !deepEqual(value1[key], value2[key])) {
      return false;
    }
  }

  return true;
}
