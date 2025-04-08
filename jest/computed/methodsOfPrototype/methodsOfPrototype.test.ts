import { load, render } from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";
import { user } from "../../common";
export type User = {
  name: string;
  age?: number;
};
export const obj = observable({
  user: {
    name: "zhao",
    age: 30,
  } as User,
  setUser(user: User) {
    this.user = user;
  },
});
export const obj1 = observable({
  user: {
    name: "zhao",
    age: 30,
  } as User,
  setUser(user: User) {
    this.user = user;
  },
});
const id = load(path.resolve(__dirname, "methodsOfPrototype")); // 此处必须传入绝对路径
const comp = render(id, { requiredUser: user }); // 渲染成自定义组件树实例

const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

test("计算属性函数使用了Reflect.has或in操作符时,缓存依赖对象字段", () => {
  expect(comp.data.hasAge).toBe(true);
  expect(comp.data._compA_in).toBe(true);
  expect(comp.data.__computedCache__.hasAge.dependences[0].paths).toStrictEqual(["user", "age"]);
  expect(comp.data.__computedCache__._compA_in.dependences[0].paths).toStrictEqual(["user", "age"]);
  obj.setUser({ name: "zhao" });
  expect(comp.data.hasAge).toBe(false);
  expect(comp.data._compA_in).toBe(false);
});

test("计算属性函数中使用对象原型方法时-依赖为对象而非内部字段", () => {
  expect(comp.data.keys).toStrictEqual(["name", "age"]);
  expect(comp.data.values).toStrictEqual(["zhao", 30]);
  expect(comp.data._compA_entries).toStrictEqual([["name", "zhao"], ["age", 30]]);
  expect(comp.data.__computedCache__.keys.dependences[0].paths).toStrictEqual(["user1"]);
  expect(comp.data.__computedCache__.values.dependences[0].paths).toStrictEqual(["user1"]);
  expect(comp.data.__computedCache__._compA_entries.dependences[0].paths).toStrictEqual(["user1"]);
  obj1.setUser({ name: "zhao" });
  expect(comp.data.keys).toStrictEqual(["name"]);
  expect(comp.data.values).toStrictEqual(["zhao"]);
  expect(comp.data._compA_entries).toStrictEqual([["name", "zhao"]]);
});
