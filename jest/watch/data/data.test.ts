import { load, render } from "miniprogram-simulate";
import path from "path";
describe("watch", () => {
  const id = load(path.resolve(__dirname, "data")); // 此处必须传入绝对路径
  const comp = render(id); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("data字段时--触发watch,从上到下,从root到sub", () => {
    const oldNum = 123;
    const oldUser = { name: "zhao", age: 20 };
    const newNum = 456;
    const newUser = { name: "lili", age: 30 };

    // 根组件 watch 根组件data字段
    expect(comp.data["root-watch-num"]).toStrictEqual([newNum, oldNum]);

    expect(comp.data["root-watch-user"]).toStrictEqual([newUser, oldUser]);

    // 子组件 watch 根组件data字段
    expect(comp.data["sub-watch-num"]).toStrictEqual([newNum, oldNum]);

    expect(comp.data["sub-watch-user"]).toStrictEqual([newUser, oldUser]);

    // 子组件 watch 自身data字段
    expect(comp.data["sub-watch-sub_num"]).toStrictEqual([newNum, oldNum]);

    expect(comp.data["sub-watch-sub_user"]).toStrictEqual([newUser, oldUser]);
  });
});
