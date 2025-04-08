import { load, render } from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";
import { user } from "../../common";
export const store = observable({
  name: "zhao",
  age: 20,
  addAge(num: number) {
    this.age = this.age + num;
  },
});
describe("计算属性 --> 一般测试", () => {
  const id = load(path.resolve(__dirname, "InitializationOnAttach")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例
  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("根组件计算属性初始化值 ", () => {
    expect(comp.data.CoptionalUser).toStrictEqual(user);

    expect(comp.data.CrequiredName).toStrictEqual(user.name);

    expect(comp.data.copyPropName).toStrictEqual(user.name);

    expect(comp.data.CStoreAge).toBe(store.age);
  });

  test("chunk组件计算属性初始化值", () => {
    expect(comp.data.chunk_CoptionalUser).toStrictEqual(user);

    expect(comp.data.chunk_CrequiredName).toStrictEqual(user.name);

    expect(comp.data.chunk_copyPropName).toStrictEqual(user.name);

    expect(comp.data.chunk_CStoreAge).toBe(store.age);
  });
  test("custom组件计算属性初始化值", () => {
    expect(comp.data.compA_num).toStrictEqual(61);

    expect(comp.data.compA_user).toStrictEqual(user);
  });
  test("store字段变化时", () => {
    store.addAge(10);

    expect(comp.data.CStoreAge).toStrictEqual(30);

    expect(comp.data.chunk_CStoreAge).toStrictEqual(30);
  });

  test("properties字段变化时", () => {
    comp.setData({
      requiredUser: { name: "zhao", age: 22 },
      optionalUser: { name: "li", age: 23 },
    });

    expect(comp.data.CrequiredName).toStrictEqual("zhao");
    expect(comp.data.copyPropName).toStrictEqual("zhao");
    expect(comp.data.chunk_CrequiredName).toStrictEqual("zhao");
    expect(comp.data.CoptionalUser).toStrictEqual({ name: "li", age: 23 });
    expect(comp.data.chunk_CoptionalUser).toStrictEqual({ name: "li", age: 23 });
    expect(comp.data.compA_user).toStrictEqual({ name: "li", age: 23 });
    expect(comp.data.compA_num).toStrictEqual(47);
  });
  test("data字段变化时", () => {
    comp.setData({
      num: 2,
    });
    expect(comp.data.chunk_num).toStrictEqual(4);
    expect(comp.data.compA_num).toStrictEqual(48);
  });
});
