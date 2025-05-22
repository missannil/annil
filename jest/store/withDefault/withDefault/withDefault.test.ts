import { load, render } from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";

export type User = {
  name: string;
  age?: number;
};
const userA = { name: "zhao", age: 20 };
const userA1 = { name: "lili", age: 20 };
const groupC = { name: "xxx", age: 40 };

export const allUser = observable({
  groupA: [userA],
  groupB: [{ name: "wang" }] as User[],
  groupC: undefined as User[] | undefined,
  updateGroupA() {
    this.groupA = [userA, userA1];
  },
  updateGroupB() {
    this.groupB = [{ name: "wang", age: 40 }];
  },
  addGruopC() {
    this.groupC = [groupC];
  },
});

test("store数据初始化在attached周期", async () => {
  const id = load(path.resolve(__dirname, "withDefault"));
  const comp = render(id, { userIdA: "groupA", userIdB: "groupB", userIdC: "groupC" });

  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);
  // root中的store数据
  expect(comp.instance.data.rootuserAList).toStrictEqual([userA]);
  expect(comp.instance.data.rootuserBAge).toBe(0);
  expect(comp.instance.data.rootuserC).toStrictEqual(null);
  // custom中的store数据
  expect(comp.instance.data.aaa_userAList).toStrictEqual([userA]);
  expect(comp.instance.data._aaa_userBAge).toBe(0);
  expect(comp.instance.data._aaa_userC).toStrictEqual([]);
  // chunk中的store数据
  expect(comp.instance.data.chunkuserAList).toStrictEqual([userA]);
  expect(comp.instance.data.chunkuserBAge).toBe(0);
  expect(comp.instance.data._chunkuserC).toBe(null);
  // 触发更新
  allUser.updateGroupA();
  expect(comp.instance.data.rootuserAList).toStrictEqual([userA, userA1]);
  expect(comp.instance.data.aaa_userAList).toStrictEqual([userA, userA1]);
  expect(comp.instance.data.chunkuserAList).toStrictEqual([userA, userA1]);

  allUser.updateGroupB();
  expect(comp.instance.data.rootuserBAge).toBe(40);
  expect(comp.instance.data._aaa_userBAge).toBe(40);
  expect(comp.instance.data.chunkuserBAge).toBe(40);

  allUser.addGruopC();
  expect(comp.instance.data.rootuserC).toStrictEqual(groupC);
  expect(comp.instance.data._aaa_userC).toStrictEqual([groupC]);
  expect(comp.instance.data._chunkuserC).toStrictEqual(groupC);
});
