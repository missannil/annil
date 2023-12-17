/**
 * 深度判断2个值是否相等,NaN与NaN不等,+0与-0相等。
 */
export function isEqual(value: unknown, other: unknown) {
  if (value === other) {
    return true;
  }
  // value和other有一个为null或不是对象 一定不相等
  if (typeof value !== "object" || value === null || typeof other !== "object" || other === null) {
    return false;
  }
  const keys1 = Object.keys(value);
  const keys2 = Object.keys(other);
  // 对象类型长度不等，一定不相等
  /* istanbul ignore next */
  if (keys1.length !== keys2.length) {
    return false;
  }
  // 递归比较存在的相同key是否相等
  for (const key of keys1) {
    // @ts-ignore 隐式索引
    if (!keys2.includes(key) || !isEqual(value[key], other[key])) {
      return false;
    }
  }

  return true;
}
