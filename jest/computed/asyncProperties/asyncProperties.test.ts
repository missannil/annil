import { load, render } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

describe("asyncProperties-对象类型初始值为null", () => {
  const id = load(path.resolve(__dirname, "asyncProperties")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: null, optionalUser: null }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("根组件计算属性初始化值", () => {
    expect(comp.data.CoptionalUser).toStrictEqual(null);

    expect(comp.data.CrequiredUser).toStrictEqual(null);

    expect(comp.data.age).toBe(21);
  });

  test("子组件计算属性初始化值", () => {
    expect(comp.data.compA_user).toStrictEqual(null);

    expect(comp.data.compA_num).toBe(0 + 0 + 1);
  });

  test("properties改变时计算属性重新计算", () => {
    comp.setData({
      requiredUser: user,
      optionalUser: user,
    });

    // 根组件计算属性
    expect(comp.data.CoptionalUser).toStrictEqual(user);

    expect(comp.data.CrequiredUser).toStrictEqual(user);

    expect(comp.data.age).toBe(30 + 1);

    // 子组件计算属性
    expect(comp.data.compA_user).toStrictEqual(user);

    expect(comp.data.compA_num).toBe(30 + 30 + 1);
  });

  test("properties更新数据与计算属性缓存深度相等时,计算属性重新计算更新", () => {
    comp.setData({
      "requiredUser.age": user.age, // 更新子属性
      optionalUser: user,
    });

    // 根组件计算属性与之前相同
    expect(comp.data.CoptionalUser).toStrictEqual(user);

    expect(comp.data.CrequiredUser).toStrictEqual(user);

    expect(comp.data.age).toBe(30 + 1);

    // 子组件计算属性与之前相同
    expect(comp.data.compA_user).toStrictEqual(user);

    expect(comp.data.compA_num).toBe(30 + 30 + 1);
  });
});
