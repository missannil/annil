import { load, render } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

const id = load(path.resolve(__dirname, "readonlyDeep")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

test("计算属性深度只读 ", () => {
  expect(comp.data.readonlyDeep).toBe("error");
  expect(comp.data.setId).toBe("error setting id");
});
