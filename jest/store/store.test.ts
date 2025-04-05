import { load, render } from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";

export const storeUser = observable({
  age: 20,
  changeAge() {
    this.age = this.age + 1;
  },
});

test("store数据初始化在attached周期", async () => {
  const id = load(path.resolve(__dirname, "store"));
  const comp = render(id);

  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  expect(comp.instance.data.age).toBe(20);
  expect(comp.instance.data.chunkAge).toBe(20);
  expect(comp.instance.data.custom_age).toBe(20);
  storeUser.changeAge();
  expect(comp.instance.data.age).toBe(21);
  expect(comp.instance.data.chunkAge).toBe(21);
  expect(comp.instance.data.custom_age).toBe(21);
  //  @ts-ignore
  comp.instance.disposer.age();
  storeUser.changeAge();
  expect(comp.instance.data.age).toBe(21);
  expect(comp.instance.data.chunkAge).toBe(22);
  expect(comp.instance.data.custom_age).toBe(22);
  comp.detach();
  storeUser.changeAge();
  expect(comp.instance.data.age).toBe(21);
  expect(comp.instance.data.chunkAge).toBe(22);
  expect(comp.instance.data.custom_age).toBe(22);
  expect(Object.keys(comp.instance.disposer).length).toBe(0);
});
