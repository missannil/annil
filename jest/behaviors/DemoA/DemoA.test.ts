import { load, render } from "miniprogram-simulate";
import path from "path";
export const mockFn = jest.fn();

describe("behaviors", () => {
  const id = load(path.resolve(__dirname, "DemoA")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: null, optionalUser: null }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  test("behavior--由根到子组件", () => {
    comp.attach(parent); // attach  到父亲节点上，此时会触发自定义组件的 attached 钩子

    expect(mockFn).toBeCalledTimes(3);

    expect(mockFn).toHaveBeenNthCalledWith(1, "Root");

    expect(mockFn).toHaveBeenNthCalledWith(2, "subA");

    expect(mockFn).toHaveBeenNthCalledWith(3, "subB");
  });
});
