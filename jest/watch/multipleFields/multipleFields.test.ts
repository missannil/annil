import { load, render } from "miniprogram-simulate";
import path from "path";
describe("watch-multipleFields", () => {
  const id = load(path.resolve(__dirname, "multipleFields")); // 此处必须传入绝对路径
  const comp = render(id); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("监控字段为多个属性", async () => {
    // 计算属性完成后会给__watchOldValue__赋值
    expect(comp.data.__watchOldValue__["rootNum,age,obj.name"]).toStrictEqual([123, 20, "zhao"]);
    // 因为监控的字段中有计算属性,所以计算属性初始化完成前变化不会的触发watch
    expect(comp.data.watchValues).toStrictEqual([]);
    expect(comp.data.watchCount).toStrictEqual(0);
    comp.setData({
      num: 456,
    });
    expect(comp.data.watchCount).toStrictEqual(1);
    expect(comp.data.watchValues).toStrictEqual([456, 20, "zhao", 123, 20, "zhao"]);
    comp.setData({
      "obj.age": 30,
    });
    expect(comp.data.watchCount).toStrictEqual(2);
    expect(comp.data.watchValues).toStrictEqual([456, 30, "zhao", 456, 20, "zhao"]);

    comp.setData({
      "obj.name": "lili",
    });
    expect(comp.data.watchCount).toStrictEqual(3);
    expect(comp.data.watchValues).toStrictEqual([456, 30, "lili", 456, 30, "zhao"]);

    comp.setData({
      "obj.name": "lili",
    });
    // obj.name没有变化,所以watch不触发
    expect(comp.data.watchCount).toStrictEqual(3);
  });
});
