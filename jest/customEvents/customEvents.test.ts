/* eslint-disable @typescript-eslint/no-explicit-any */
import { load, render } from "miniprogram-simulate";
import path from "path";

describe("customEvents--自定义事件", () => {
  const id = load(path.resolve(__dirname, "customEvents")); // 此处必须传入绝对路径
  const comp = render(id, { requiredUser: null, optionalUser: null }); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点
  const customEventStr = jest.spyOn(comp.instance as any, "str");
  const customEventUnion = jest.spyOn(comp.instance as any, "union");
  const customEventNothing = jest.spyOn(comp.instance as any, "nothing");
  const customEventNull = jest.spyOn(comp.instance as any, "null");

  test("自定义组件回调函数参数测试", () => {
    comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

    expect(customEventStr).toHaveBeenCalledWith("string");

    expect(customEventUnion).toHaveBeenCalledWith(["a", "b", "c"]);

    expect(customEventNothing).toHaveBeenCalledWith();

    expect(customEventNull).toHaveBeenCalledWith(null);
  });
});
