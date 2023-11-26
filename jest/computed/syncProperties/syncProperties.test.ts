import { load, render } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

describe("syncProperties-传入非null值的必传对象,选传为空", () => {
  const id = load(path.resolve(__dirname, "syncProperties")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("根组件计算属性初始化值", () => {
    expect(comp.data.CrequiredUser).toStrictEqual(user);

    expect(comp.data.CoptionalUser).toStrictEqual(user);

    expect(comp.data.copyPropUser).toStrictEqual(user);

    expect(comp.data.age).toBe(30 + 1);
  });

  test("子组件计算属性初始化值", () => {
    expect(comp.data.compA_user).toStrictEqual(user);

    expect(comp.data.compA_num).toBe(30 + 30 + 1);
  });
});
