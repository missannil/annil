import { load, render } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

const id = load(path.resolve(__dirname, "dependenceOnNext")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

test("计算属性依赖后面的计算属性", () => {
  expect(comp.data.copyUser).toStrictEqual({ age: 10, name: "zhao" });
  expect(comp.data.age).toBe(10);
  expect(comp.data.keys).toStrictEqual(["age", "name"]);
});
