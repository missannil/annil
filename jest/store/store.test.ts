import { load, render } from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";

export const storeUser = observable({
  name: "zhao",
  age: 20,
  changeAge() {
    this.age = this.age + 1;
  },
  changeName(name: string) {
    this.name = name;
  },
});

test("store数据初始化在attached周期", async () => {
  const id = load(path.resolve(__dirname, "store"));
  const comp = render(id);

  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  expect(comp.instance.data.age).toBe(21);

  expect(comp.instance.data.aaa_name).toBe("lili");

  // @ts-ignore
  comp.instance.disposer.age();

  storeUser.changeAge();

  expect(storeUser.age).toBe(22);

  expect(comp.instance.data.age).toBe(21);

  comp.detach();

  storeUser.changeName("zhao");

  expect(storeUser.name).toBe("zhao");

  expect(comp.instance.data.aaa_name).toBe("lili");
});
