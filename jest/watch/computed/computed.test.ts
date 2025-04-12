import { load, render } from "miniprogram-simulate";
import path from "path";
import type { User } from "../../computed/methodsOfPrototype/methodsOfPrototype.test";
const user = { name: "zhao", age: 20 } as User;
describe("watch-computed", () => {
  const id = load(path.resolve(__dirname, "computed")); // 此处必须传入绝对路径
  const comp = render(id, { user, num: 456 }); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("计算字段改变时--触发watch,从上到下,从root到sub", async () => {
    const newUser = { name: "lili", age: 30 };

    expect(comp.data["root-watch-num"]).toStrictEqual([456, 123]);
    // 根组件 watch computed字段
    expect(comp.data["root-watch-rootNum"]).toStrictEqual([]);
    expect(comp.data["root-watch-user"]).toStrictEqual([]);
    expect(comp.data["root-watch-rootUser.name,num"]).toStrictEqual([]);
    // 子组件 watch computed字段
    expect(comp.data["sub-watch-num"]).toStrictEqual(undefined);

    expect(comp.data["sub-watch-user"]).toStrictEqual(undefined);

    comp.instance.setData({
      num: 789,
      user: newUser,
    });
    // 根组件 watch computed字段
    expect(comp.data["root-watch-num"]).toStrictEqual([789, 456]);
    expect(comp.data["root-watch-rootNum"]).toStrictEqual([789, 456]);
    expect(comp.data["root-watch-user"]).toStrictEqual([newUser, user]);
    expect(comp.data["root-watch-rootUser.name,num"]).toStrictEqual([newUser.name, 789, user.name, 789]);
    // 子组件 watch computed字段
    expect(comp.data["sub-watch-num"]).toStrictEqual([789, 456]);

    expect(comp.data["sub-watch-user"]).toStrictEqual([newUser, user]);
  });
});
