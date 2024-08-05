/* eslint-disable @typescript-eslint/no-unused-expressions */
import { isEqual } from "../src/api/DefineComponent/assignOptions/computedWatchHandle/isEqual";
describe("isEqual", () => {
  isEqual;

  test("+0与-0不等", () => {
    expect(isEqual(+0, -0)).toBeFalsy;
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

    expect(isEqual(FnA, FnB)).toBeTruthy;

    expect(isEqual(FnC, FnD)).toBeFalsy;
  });

  test("Date类型用getTime()比较", async () => {
    const DateA = new Date();
    const DateB = new Date();

    expect(isEqual(DateA, DateA)).toBeTruthy;

    expect(isEqual(DateA, DateB)).toBeFalsy;
  });

  test("正则通过source和flags字段比较", async () => {
    const RegA = RegExp("__");
    const RegB = RegExp("_");

    expect(isEqual(RegA, RegA)).toBeTruthy;

    expect(isEqual(RegA, RegB)).toBeFalsy;
  });

  test("不同类型对象比较", async () => {
    const a = RegExp("__");
    const b = new Date();

    expect(isEqual(a, b)).toBeFalsy;
  });

  test("不受原型链属性影响", async () => {
    const proto = { num: 123, str: "string" };
    const a = Object.create(proto);

    a.num = 123;

    const b = Object.create(proto);

    b.str = "string";

    // 虽然 a和b的字段值都相同(1,2),但借助了原型链,所以也不是相同对象(3)
    expect(isEqual(a.num, b.num)).toBeTruthy; // 1

    expect(isEqual(a.str, b.str)).toBeTruthy; // 2

    expect(isEqual(a, b)).toBeFalsy; // 3
  });
});
