import { load, render } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

describe("计算属性 --> 一般测试", () => {
  const id = load(path.resolve(__dirname, "readonlyDeep")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("根组件计算属性初始化值(attached) ", () => {
    expect(comp.data.readonlyDeep).toBe("error");
  });
});
