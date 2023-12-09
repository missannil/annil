import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

describe("计算属性可以使用this上的属性和方法", () => {
  const id = load(path.resolve(__dirname, "userInstance")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子
  // 初始值

  test("初始化值和改变依赖后的值", async () => {
    expect(comp.data.age).toBe(25);

    await sleep(0);

    expect(comp.data.age).toBe(26);
  });
});
