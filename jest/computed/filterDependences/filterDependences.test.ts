import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
import type { ComputedDependence } from "../../../src/api/DefineComponent/normalizeOptions/computedWatchHandle/computedUpdater";

import {
  removeSubDependences,
} from "../../../src/api/DefineComponent/normalizeOptions/computedWatchHandle/dependencesOptimize";
import { user } from "../../common";

const id = load(path.resolve(__dirname, "filterDependences")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

// test("相同依赖去重", () => {
//   const testDependences: ComputedDependence[] = [
//     { paths: ["a", "b"], val: 1 },
//     { paths: ["c", "d"], val: 1 },
//     { paths: ["a", "b"], val: 1 },
//     { paths: ["e", "f"], val: 1 },
//     { paths: ["c", "d"], val: 1 },
//     { paths: ["e", "f"], val: 1 },
//   ];
//   const res = uniqueDependences(testDependences, [], "");

//   expect(res).toStrictEqual([{ paths: ["a", "b"], val: 1 }, { paths: ["c", "d"], val: 1 }, {
//     paths: ["e", "f"],
//     val: 1,
//   }]);
// });

// test("连续依赖去除", () => {
//   const testDependences: ComputedDependence[] = [
//     { paths: ["user"], val: { name: "zhao" } },
//   ];
//   const res = removePreviousDependence(testDependences, ["user", "name"]);

//   expect(res).toStrictEqual([]);
// });

test("去除子依赖", () => {
  const testDependences: ComputedDependence[] = [
    { paths: ["obj", "a"], val: {} },
    { paths: ["obj"], val: {} },
    { paths: ["obj", "a", "c"], val: {} },
    { paths: ["obj", "b", "c"], val: {} },
    { paths: ["ddd", "a", "d"], val: {} },
    { paths: ["ddd", "a"], val: {} },
  ];
  const res = removeSubDependences(testDependences);

  expect(res).toStrictEqual([{ paths: ["obj"], val: {} }, { paths: ["ddd", "a"], val: {} }]);
});

test("依赖去重", async () => {
  expect(comp.data.__computedCache__.list.dependences).toStrictEqual([
    {
      paths: ["obj"],
      val: { a: { list: [1, 2, 3] } },
    },
    { paths: ["id"], val: "0" },
  ]);

  await sleep(200);

  expect(comp.data.__computedCache__.list.dependences).toStrictEqual([
    {
      paths: ["obj"],
      val: { a: { list: [1, 2, 3] } },
    },
    { paths: ["id"], val: "a" },
  ]);
});
