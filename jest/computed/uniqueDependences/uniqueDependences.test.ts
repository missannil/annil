import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

const id = load(path.resolve(__dirname, "uniqueDependences")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

test("计算属性函数中调用数组的方法时,方法不属于依赖", async () => {
  expect(comp.data.__computedCache__.list.dependences).toStrictEqual([
    { paths: ["obj"], val: { a: { list: [1, 2, 3] } } },
    { paths: ["id"], val: "0" },
  ]);

  await sleep(200);

  expect(comp.data.__computedCache__.list.dependences).toStrictEqual([
    { paths: ["obj"], val: { a: { list: [1, 2, 3] } } },
    { paths: ["id"], val: "a" },
  ]);
});
