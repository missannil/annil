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
  const id = load(path.resolve(__dirname, "InitializationOnAttached")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例
  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("根组件计算属性初始化值 ", () => {
    expect(comp.data.CDataNum).toStrictEqual(1);

    expect(comp.data.CStoreAge).toStrictEqual(20);
  });

  test("chunk组件计算属性初始化值", () => {
    expect(comp.data.chunk_CStoreAge).toStrictEqual(21);

    expect(comp.data.chunk_CDataNum).toStrictEqual(2);
  });
  test("custom组件计算属性初始化值", () => {
    expect(comp.data.compA_num).toStrictEqual(42);
  });
  test("store字段变化时", () => {
    store.addAge(10);

    expect(comp.data.CStoreAge).toStrictEqual(30);

    expect(comp.data.chunk_CStoreAge).toStrictEqual(31);

    expect(comp.data.compA_num).toStrictEqual(62);
  });

  test("data字段变化时", () => {
    comp.setData({
      num: 2,
    });
    expect(comp.data.CDataNum).toStrictEqual(2);
    expect(comp.data.chunk_CDataNum).toStrictEqual(3);
    expect(comp.data.compA_num).toStrictEqual(64);
  });
});
