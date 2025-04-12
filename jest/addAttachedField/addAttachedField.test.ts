import simulate from "miniprogram-simulate";
import path from "path";

describe("addAttachedField", () => {
  const id = simulate.load(path.resolve(__dirname, "addAttachedField"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("attached周期结束后,为data加入attached:true", () => {
    expect(comp.data.attached).toStrictEqual(true);
    expect(comp.data.test).toStrictEqual(123);
    expect(comp.data.__notUpdateComputed__).toStrictEqual(false);
    // 后续的计算属性更新不受影响
    comp.setData({
      num: 456,
    });
    expect(comp.data.test).toStrictEqual(456);
  });
});
