import { load, render, sleep } from "miniprogram-simulate";
import path from "path";

describe("覆盖率测试", () => {
  const id = load(path.resolve(__dirname, "forCoverage")); // 此处必须传入绝对路径
  const comp = render(id); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("为了覆盖率", async () => {
    await sleep(500);

    expect(comp.data.count).toBe(2);
  });
});
