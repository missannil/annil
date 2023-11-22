import { load, render } from "miniprogram-simulate";
import { runInAction } from "mobx";
import path from "path";
import type { InstanceInner } from "../../src/behaviors/BComputedAndWatch/types";
import { user } from "./user";
describe("store-test", () => {
  const id = load(path.resolve(__dirname, "store"));
  const comp = render(id);

  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  type InstanceData = { age: number; aaa_name: string };

  const instance = comp.instance as unknown as (InstanceInner & { data: InstanceData });

  test("store数据初始化在attached周期", () => {
    expect(instance.data.age).toBe(10);

    expect(instance.data.aaa_name).toBe("zhao");
  });

  test("store数据变化时自动setData(同步)", () => {
    runInAction(() => {
      user.age++;
    });

    runInAction(() => {
      user.name = "lili";
    });

    expect(instance.data.age).toBe(11);

    expect(instance.data.aaa_name).toBe("lili"); // 测试渲染结果
  });

  test("实例方法disposer可取消对store变化的监控", () => {
    for (const key in instance.disposer) {
      instance.disposer[key]();
    }
    runInAction(() => {
      user.age++;

      user.name = "xxx";
    });

    expect(comp.instance.data.age).toBe(11);

    expect(comp.instance.data.aaa_name).toBe("lili");
  });
});
