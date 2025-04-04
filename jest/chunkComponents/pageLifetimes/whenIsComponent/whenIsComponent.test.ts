import simulate from "miniprogram-simulate";
import path from "path";

export const user = { age: 20 };

describe("slot-pageLifetimes定义字段", () => {
  const id = simulate.load(path.resolve(__dirname, "whenIsComponent"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);
  test("slot-传入组件前pageLifetimes字段是循环运行根和子定义load函数配置", () => {
    expect(user.age).toBe(22);
  });
});
