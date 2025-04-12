import simulate from "miniprogram-simulate";
import path from "path";

describe("hasAttachedField", () => {
  const id = simulate.load(path.resolve(__dirname, "hasAttachedField"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("当定义了attached字段时,不影响", () => {
    expect(comp.data.__notUpdateComputed__).toStrictEqual(undefined);
    expect(comp.data.attached).toStrictEqual(false);
    expect(comp.data.test).toStrictEqual(123);
    // 计算属性更新不受影响
    comp.setData({
      num: 456,
    });
    expect(comp.data.test).toStrictEqual(456);
  });
});
