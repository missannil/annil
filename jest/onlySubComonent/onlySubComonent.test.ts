import simulate from "miniprogram-simulate";
import path from "path";

describe("RootComponent-events", () => {
  const id = simulate.load(path.resolve(__dirname, "onlySubComonent"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("events字段 onTap事件", () => {
    expect(comp.instance.data.aaa_num).toBe(comp.instance.data.aaa2_num);
  });

  // 有些测试描述不对，下次再改
});
