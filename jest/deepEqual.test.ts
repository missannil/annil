/* eslint-disable @typescript-eslint/no-unused-expressions */
import { deepEqual } from "../src/utils/deepEqual";
describe("deepEqual", () => {
  deepEqual;

  test("+0与-0不等", () => {
    expect(deepEqual(+0, -0)).toBeFalsy;
  });

  test("函数相等使用toString()判断(函数名不同也认为不等)", async () => {
    const FnA = function() {
      return 123;
    };
    const FnB = function() {
      return 123;
    };
    const FnC = function FnC() {
      return 123;
    };
    const FnD = function FnD() {
      return 123;
    };

    expect(deepEqual(FnA, FnB)).toBeTruthy;

    expect(deepEqual(FnC, FnD)).toBeFalsy;
  });

  test("Date类型用getTime()比较", async () => {
    const DateA = new Date();
    const DateB = new Date();

    expect(deepEqual(DateA, DateA)).toBeTruthy;

    expect(deepEqual(DateA, DateB)).toBeFalsy;
  });

  test("正则通过source和flags字段比较", async () => {
    const RegA = RegExp("__");
    const RegB = RegExp("_");

    expect(deepEqual(RegA, RegA)).toBeTruthy;

    expect(deepEqual(RegA, RegB)).toBeFalsy;
  });

  test("不同类型对象比较", async () => {
    const a = RegExp("__");
    const b = new Date();

    expect(deepEqual(a, b)).toBeFalsy;
  });

  test("不受原型链属性影响", async () => {
    const proto = { num: 123, str: "string" };
    const a = Object.create(proto);

    a.num = 123;

    const b = Object.create(proto);

    b.str = "string";

    // 虽然 a和b的字段值都相同(1,2),但借助了原型链,所以也不是相同对象(3)
    expect(deepEqual(a.num, b.num)).toBeTruthy; // 1

    expect(deepEqual(a.str, b.str)).toBeTruthy; // 2

    expect(deepEqual(a, b)).toBeFalsy; // 3
  });
});
