import simulate from "miniprogram-simulate";
import path from "path";

describe("页面pageLifetimes定义字段最终在methods中", () => {
  const id = simulate.load(path.resolve(__dirname, "pageLifetimes"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("模拟测试methods中是否有pageLifetimes定义的字段", () => {
    expect(comp.instance.data.age).toBe(20);
  });
});
