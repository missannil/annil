import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
export const mockFn = jest.fn();

describe("cloneData", () => {
  const id = load(path.resolve(__dirname, "DemoA")); // 此处必须传入绝对路径
  const comp = render(id); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("cloneData与data深度相等但不是一个引用值", async () => {
    // 1. cloneData与data不是一个引用值
    expect(comp.instance.data).not.toBe(comp.instance.cloneData);

    // 2. cloneData与data深度相等
    expect(comp.instance.data).toEqual(comp.instance.cloneData);

    await sleep(300);

    // 3. setData后,cloneData也会的值随之改变
    expect(comp.instance.data.str).toBe("xxxx");

    expect(comp.instance.data.obj1).toEqual({ name: "zhao", age: 20 });

    // 3. cloneData与data不是一个引用值
    expect(comp.instance.data).not.toBe(comp.instance.cloneData);

    // 4. cloneData与data深度相等
    expect(comp.instance.data).toEqual(comp.instance.cloneData);
  });
});
