import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
describe("watch-computed", () => {
  const id = load(path.resolve(__dirname, "computed")); // 此处必须传入绝对路径
  const comp = render(id); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("计算字段改变时--触发watch,从上到下,从root到sub", async () => {
    const oldNum = 123;
    const oldUser = { name: "zhao", age: 20 };
    const newNum = 456;
    const newUser = { name: "lili", age: 30 };

    // 根组件 watch computed字段
    expect(comp.data["root-watch-num"]).toStrictEqual([newNum, oldNum]);

    expect(comp.data["root-watch-user"]).toStrictEqual([newUser, oldUser]);

    // 子组件 watch computed字段
    expect(comp.data["sub-watch-num"]).toStrictEqual([newNum, oldNum]);

    expect(comp.data["sub-watch-user"]).toStrictEqual([newUser, oldUser]);

    // 监控对象子字段  rootUser.name
    await sleep(0);

    expect(comp.data["root-watch-rootUser.name"]).toStrictEqual(["zhao", "lili"]);
  });
});
