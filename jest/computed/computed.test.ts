import { load, render } from "miniprogram-simulate";
import path from "path";

describe("computed-test", () => {
  const id = load(path.resolve(__dirname, "computed")); // 此处必须传入绝对路径
  const comp = render(id); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("age字段--依赖了未初始化的计算属性(copyUser1)的子属性age", () => {
    expect(comp.data.age).toBe(21);
  });

  test("copyUser1字段--依赖了未初始化的计算属性(copyUser)", () => {
    expect(comp.data.copyUser1).toStrictEqual({ name: "zhao", age: 20 });
  });

  test("copyUser字段--依赖data字段", () => {
    expect(comp.data.copyUser).toStrictEqual({ name: "zhao", age: 20 });
  });

  test("properties-user改变时,root和sub的计算属性都改变", () => {
    comp.setData({
      user: { name: "lili", age: 30 },
    });

    expect(comp.data.age).toBe(31);

    expect(comp.data.aaa_user).toStrictEqual({ name: "lili", age: 30 });

    expect(comp.data.copyUser1).toStrictEqual({ name: "lili", age: 30 });

    expect(comp.data.copyUser).toStrictEqual({ name: "lili", age: 30 });
  });

  test("properties-user.age改变时", async () => {
    comp.setData({
      "user.age": 40,
    });

    expect(comp.data.aaa_user).toStrictEqual({ name: "lili", age: 40 });

    expect(comp.data.copyUser1).toStrictEqual({ name: "lili", age: 40 });

    expect(comp.data.copyUser).toStrictEqual({ name: "lili", age: 40 });
  });
});
