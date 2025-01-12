import simulate from "miniprogram-simulate";
import path from "path";

describe("页面pageLifetimes定义字段最终在methods中", () => {
  const id = simulate.load(path.resolve(__dirname, "pageLifetimes"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (comp as any).triggerPageLifeTime("onLoad", { user: { name: "zhao", age: 21 } });
  test("模拟测试methods中是否有pageLifetimes定义的字段", () => {
    expect(comp.instance.data.age).toBe(21);
  });
});
