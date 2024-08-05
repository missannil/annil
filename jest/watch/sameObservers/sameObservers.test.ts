import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
export const oldUser = { name: "zhao", age: 20 };

export const newUser = { name: "lili", age: 30 };

const newUser40 = { name: "lili", age: 40 };

describe("watch-computed", () => {
  const id = load(path.resolve(__dirname, "sameObservers")); // 此处必须传入绝对路径
  const comp = render(id); // 挂载周期 位于created和attached之间

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("observers和watch相同字段时,分别触发", async () => {
    await sleep(0);

    // 根组件 observers 和 watch

    expect(comp.data.observersUser).toStrictEqual([newUser]);

    expect(comp.data.watchUser).toStrictEqual([newUser, oldUser]);
    // 子组件 observers 和 watch

    expect(comp.data.observersSubUser).toStrictEqual([newUser]);

    expect(comp.data.watchSubUser).toStrictEqual([newUser, oldUser]);
  });

  test("observers和watch带**的触发,不带的不触发", async () => {
    await sleep(100);

    // 不带**的同上次触发结果
    expect(comp.data.observersUser).toStrictEqual([newUser]);

    expect(comp.data.watchUser).toStrictEqual([newUser, oldUser]);

    // 子字段监控的是计算属性,计算属性setData是整体对象,所以这里会改变
    expect(comp.data.observersSubUser).toStrictEqual([newUser40]);

    expect(comp.data.watchSubUser).toStrictEqual([newUser40, newUser]);

    // 带**的 age 等于 40
    expect(comp.data["observersUser.**"]).toStrictEqual([newUser40]);

    expect(comp.data["watchUser.**"]).toStrictEqual([newUser40, newUser]);

    expect(comp.data["observersSubUser.**"]).toStrictEqual([newUser40]);

    expect(comp.data["watchSubUser.**"]).toStrictEqual([newUser40, newUser]);
  });
});
