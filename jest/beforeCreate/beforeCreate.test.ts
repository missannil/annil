import { load, render } from "miniprogram-simulate";
import path from "path";
export const mock_beforeCreate = { beforeCreate() {} };

describe("beforeCreate", () => {
  const id = load(path.resolve(__dirname, "beforeCreate")); // 此处必须传入绝对路径
  const comp = render(id); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("beforeCreate周期被调用", () => {
    const spyBeforeCreate = jest.spyOn(mock_beforeCreate, "beforeCreate");

    expect(spyBeforeCreate).toHaveBeenCalled;
  });
});
