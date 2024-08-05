function isSameType(a: object, b: object) {
  return Object.prototype.toString.call(a) === Object.prototype.toString.call(b);
}

// 定义一个辅助函数，用于判断两个对象的属性数量是否相同
function isSameSize(a: object, b: object) {
  return Object.keys(a).length === Object.keys(b).length;
}

// 定义一个辅助函数，用于判断两个函数的代码是否相同
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function isSameCode(a: Function, b: Function) {
  // 去除空格比较函数字符串
  return a.toString().split(" ").join("") === b.toString().split(" ").join("");
}

// 定义一个辅助函数，用于判断两个日期的时间戳是否相同
function isSameTime(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}

// 定义一个辅助函数，用于判断两个正则表达式的模式和标志是否相同
function isSamePattern(a: RegExp, b: RegExp) {
  return a.source === b.source && a.flags === b.flags;
}

/**
 * 深度判断两个值是否相等,有一个值为非对象类型即使用Object.is判断。
 * 不支持原型上的属性
 * 两个函数使用toString()比较
 * 支持Date,RegExp
 */
export function isEqual(a: unknown, b: unknown) {
  // 如果两个值是原始类型或null，直接用Object.is比较
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    if (typeof a !== "function" || typeof b !== "function") {
      return Object.is(a, b);
    }
  }

  // 如果两个值是对象类型，先判断它们的类型、构造函数和属性数量是否相同
  if (!isSameType(a, b) || a.constructor !== b.constructor || !isSameSize(a, b)) {
    return false;
  }

  // 如果两个值是函数类型，再判断它们的代码是否相同
  if (typeof a === "function") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    return isSameCode(a, b as Function);
  }

  // 如果两个值是日期类型，再判断它们的时间戳是否相同
  if (a instanceof Date) {
    return isSameTime(a, b as Date);
  }

  // // 如果两个值是正则表达式类型，再判断它们的模式和标志是否相同
  if (a instanceof RegExp) {
    return isSamePattern(a, b as RegExp);
  }

  // 对于其他对象类型，递归地比较它们的每个属性和值是否深度相等
  const keysA = Object.keys(a);

  const keysB = Object.keys(b);

  for (const key of keysA) {
    if (keysB.includes(key)) {
      // @ts-ignore
      if (!isEqual(a[key], b[key])) {
        return false;
      }
    } else {
      return false;
    }
  }

  // 如果以上的条件都满足，说明两个值是深度相等的
  return true;
}
