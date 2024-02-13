import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
import type { ComputedDependence } from "../../../src/api/DefineComponent/assignOptions/computedWatchHandle/computedUpdater";
import { uniqueDependences } from "../../../src/api/DefineComponent/assignOptions/computedWatchHandle/uniqueDependences";
import { user } from "../../common";

const id = load(path.resolve(__dirname, "uniqueDependences")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

test("相同依赖去重", () => {
  const testDependences: ComputedDependence[] = [
    { paths: ["a", "b"], val: 1 },
    { paths: ["c", "d"], val: 1 },
    { paths: ["a", "b"], val: 1 },
    { paths: ["e", "f"], val: 1 },
    { paths: ["c", "d"], val: 1 },
    { paths: ["e", "f"], val: 1 },
  ];
  const res = uniqueDependences(testDependences, [], "");

  expect(res).toStrictEqual([{ paths: ["a", "b"], val: 1 }, { paths: ["c", "d"], val: 1 }, {
    paths: ["e", "f"],
    val: 1,
  }]);
});

test("连续依赖去除", () => {
  const testDependences: ComputedDependence[] = [
    { paths: ["a", "b"], val: 1 },
  ];
  const res = uniqueDependences(testDependences, ["a", "b"], "c");

  expect(res).toStrictEqual([]);
});

test("间隔依赖去除", () => {
  // if(-2paths concat -1的val === 当前依赖)  去除-2依赖。 示例 this.data.obj[this.data.id].list  去除 obj

  const testDependences: ComputedDependence[] = [
    { paths: ["a"], val: 1 },
    { paths: ["id"], val: "2" },
  ];
  const res = uniqueDependences(testDependences, ["a"], "2");

  expect(res).toStrictEqual([{ paths: ["id"], val: "2" }]);
});

test("依赖去重", async () => {
  expect(comp.data.__computedCache__.list.dependences).toStrictEqual([
    { paths: ["id"], val: "0" },
    { paths: ["obj", "0"], val: undefined },
  ]);

  await sleep(200);

  expect(comp.data.__computedCache__.list.dependences).toStrictEqual([
    { paths: ["id"], val: "a" },
    { paths: ["obj", "a", "list"], val: [1, 2, 3] },
  ]);
});
