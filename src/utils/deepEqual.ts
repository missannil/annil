type PlainObject = Record<string, unknown>;
// 非null的对象类型
function isNonNullObject(value: unknown): boolean {
  return value !== null && typeof value === "object";
}

export function deepEqual(value1: unknown, value2: unknown): boolean {
  // 2个非对象类型相等或同引用对象的情况。
  if (Object.is(value1, value2)) {
    return true;
  }
  // 有一个不是非空对象,返回false。
  if (!isNonNullObject(value1) || !isNonNullObject(value2)) {
    return false;
  }
  // 到此，2个都是对象类型。
  const _value1 = value1 as PlainObject;
  const _value2 = value2 as PlainObject;
  const value1Keys = Object.keys(_value1);
  const value2Keys = Object.keys(_value2);

  if (value1Keys.length !== value2Keys.length) {
    return false;
  }

  for (const key of value1Keys) {
    if (!value2Keys.includes(key) || !deepEqual(_value1[key], _value2[key])) {
      return false;
    }
  }

  return true;
}
