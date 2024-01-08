import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
import type { Instance } from "../../src/api/DefineComponent/assignOptions";

describe("store-test", () => {
  const id = load(path.resolve(__dirname, "store"));
  const comp = render(id);

  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  type InstanceData = { age: number; aaa_name: string };

  const instance = comp.instance as unknown as (Instance & { data: InstanceData });

  test("store数据初始化在attached周期", () => {
    expect(instance.data.age).toBe(10);

    expect(instance.data.aaa_name).toBe("zhao");
  });

  test("store数据变化时自动setData(同步)", async () => {
    await sleep(200);

    expect(instance.data.age).toBe(20);
  });

  test("实例方法disposer可取消对store变化的监控", async () => {
    await sleep(400);

    expect(comp.instance.data.age).toBe(20);
  });
});
