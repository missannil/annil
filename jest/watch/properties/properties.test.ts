import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
describe("watch", () => {
  const id = load(path.resolve(__dirname, "properties")); // 此处必须传入绝对路径
  const num = 123;
  const user = { name: "zhao", age: 20 };
  const comp = render(id, { num, user }); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  const newNum = 456;
  const newUser = { name: "lili", age: 30 };

  // 模拟再次传入properties
  setTimeout(() => {
    comp.setData({
      num: newNum,
      user: newUser,
    });
  }, 1000);

  test("properties改变时--触发watch,从上到下,从根组件到子组件", async () => {
    expect(comp.data["root-watch-num"]).toStrictEqual([num, 0]);

    expect(comp.data["root-watch-user"]).toStrictEqual([user, null]);

    expect(comp.data["root-watch-user.age"]).toStrictEqual([20, undefined]);

    expect(comp.data["sub-watch-num"]).toStrictEqual([num, 0]);

    expect(comp.data["sub-watch-user"]).toStrictEqual([user, null]);

    expect(comp.data["sub-watch-user.name"]).toStrictEqual([user.name, undefined]);

    await sleep(1000);

    expect(comp.data["root-watch-num"]).toStrictEqual([newNum, num]);

    expect(comp.data["root-watch-user"]).toStrictEqual([newUser, user]);

    expect(comp.data["root-watch-user.age"]).toStrictEqual([30, 20]);

    expect(comp.data["sub-watch-num"]).toStrictEqual([newNum, num]);

    expect(comp.data["sub-watch-user"]).toStrictEqual([newUser, user]);

    expect(comp.data["sub-watch-user.name"]).toStrictEqual([newUser.name, user.name]);
  });
});
