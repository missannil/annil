import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

describe("计算属性 --> 一般测试", () => {
  const id = load(path.resolve(__dirname, "normal")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("根组件计算属性初始化值(attached) ", () => {
    expect(comp.data.CoptionalUser).toStrictEqual(user);

    expect(comp.data.CoptionalUser).toStrictEqual(user);

    expect(comp.data.copyPropUser).toStrictEqual(user);

    expect(comp.data.age).toBe(30 + 1);

    expect(comp.data.CStoreAge).toBe(20);
  });

  test("子组件计算属性初始化值(attached)", () => {
    expect(comp.data.compA_user).toStrictEqual(user);

    expect(comp.data.compA_num).toBe(30 + 1 + 30);
  });

  test("data字段变化时", async () => {
    await sleep(100);

    expect(comp.data.age).toStrictEqual(30 + 2);

    expect(comp.data.compA_num).toBe(30 + 2 + 30);
  });

  test("properties字段变化时", async () => {
    await sleep(200);

    expect(comp.data.CrequiredUser).toStrictEqual({ name: "zhao", age: 20 });

    expect(comp.data.copyPropUser).toStrictEqual({ name: "zhao", age: 20 });

    expect(comp.data.compA_user).toStrictEqual({ name: "zhao", age: 20 });

    expect(comp.data.age).toBe(20 + 2);
  });

  test("setData改变对象子字段时", async () => {
    await sleep(300);

    expect(comp.data.CoptionalUser).toStrictEqual({ name: "lili", age: 50 });

    expect(comp.data.compA_num).toStrictEqual(50 + 2 + 50);
  });

  test("store字段变化时", async () => {
    await sleep(400);

    expect(comp.data.CStoreAge).toBe(30);
  });

  test("properties对象字段为null时", async () => {
    await sleep(1000);

    expect(comp.data.CoptionalUser).toBe(null);

    expect(comp.data.compA_num).toStrictEqual(0 + 2 + 0);
  });
});
