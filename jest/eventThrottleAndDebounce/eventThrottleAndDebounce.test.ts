import simulate from "miniprogram-simulate";
import path from "path";

describe("RootComponent-events", () => {
  const id = simulate.load(path.resolve(__dirname, "eventThrottleAndDebounce"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = jest.spyOn(comp.instance as any, "debounceEvent");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const throttle = jest.spyOn(comp.instance as any, "throttleEvent");

  test("events字段 debounceEvent事件", async () => {
    comp.attach(parent);
    // 测试防抖函数 实际上没有防抖效果,但可以通过这里的测试完成代码覆盖率测试。哈...
    expect(debounce).toHaveBeenNthCalledWith(1, "debounceEvent-first");
    expect(debounce).toHaveBeenNthCalledWith(2, "debounceEvent-second");
    // 测试节流函数 实际上没有节流效果,但可以通过这里的测试完成代码覆盖率测试。哈...
    expect(throttle).toHaveBeenNthCalledWith(1, "throttleEvent-first");
    expect(throttle).toHaveBeenNthCalledWith(2, "throttleEvent-second");
  });
});
