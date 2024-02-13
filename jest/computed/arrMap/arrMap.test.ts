import { load, render } from "miniprogram-simulate";
import path from "path";
import { user } from "../../common";

const id = load(path.resolve(__dirname, "arrMap")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

test("计算属性函数中调用数组的方法时,方法不属于依赖", () => {
  expect(comp.data.objFunAdd).toBe(2);

  expect(comp.data.__computedCache__.objFunAdd.dependences[0].paths).toStrictEqual(["objFun", "add"]);

  expect(comp.data.__computedCache__.objFunAdd.dependences[1].paths).toStrictEqual(["objFun", "a"]);
});

test("计算属性函数中调用数组的方法时,方法不属于依赖-子组件", () => {
  expect(comp.data._compA_listMap).toStrictEqual([3, 4, 5]);

  expect(comp.data.__computedCache__._compA_listMap.dependences).toStrictEqual([{
    "paths": ["storeList"],
    "val": [1, 2, 3],
  }]);
});

test("计算属性函数中调用数组索引时,索引属于依赖", () => {
  expect(comp.data.listMap).toBe(2);

  expect(comp.data.__computedCache__.listMap.dependences).toStrictEqual([{ "paths": ["storeList", "0"], "val": 1 }]);
});
