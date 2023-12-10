import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
describe("watch-multipleFields", () => {
  const id = load(path.resolve(__dirname, "multipleFields")); // 此处必须传入绝对路径
  const comp = render(id); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("监控字段为多个属性", async () => {
    // 多字段变化值比较
    expect(comp.data.valueList).toStrictEqual([456, 20, "zhao", 123, 20, "zhao"]);

    await sleep(0);

    expect(comp.data.valueList).toStrictEqual([456, 30, "zhao", 456, 20, "zhao"]);

    await sleep(0);

    expect(comp.data.valueList).toStrictEqual([456, 30, "lili", 456, 30, "zhao"]);
  });
});
