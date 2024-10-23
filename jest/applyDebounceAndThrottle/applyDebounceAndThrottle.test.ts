import { load, render, sleep } from "miniprogram-simulate";
import path from "path";
export const mock_beforeCreate = {
  beforeCreate() {
    void 0;
  },
};

describe("applyDebounceAndThrottle", () => {
  const id = load(path.resolve(__dirname, "applyDebounceAndThrottle")); // 此处必须传入绝对路径
  const comp = render(id); // 渲染成自定义组件树实例

  const parent = document.createElement("parent-wrapper"); // 创建挂载(父)节点

  comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  test("sub中方法被连续调用", async () => {
    const sub = comp.querySelector("#sub") as { dispatchEvent: (arg0: string) => void };
    sub.dispatchEvent("onTapDebounced");
    sub.dispatchEvent("onTapDebounced");
    sub.dispatchEvent("onTapThrottled");
    sub.dispatchEvent("onTapThrottled");
    await sleep(0); // 事件触发是异步的，所以需要等待一下
    const data = comp.instance.data;
    expect(data.sub_debounced).toBe(0); // 默认300ms后执行,所以当前值为0
    void expect(data.sub_throttle).toBe(1); // 立即执行,所以当前值为1
    await sleep(350); // 测试时最少要310ms
    const data1 = comp.instance.data;
    void expect(data1.sub_debounced).toBe(1); // 只会执行1次,所以当前值为1
    void expect(data1.sub_throttle).toBe(1); // 只会执行1次,所以当前值为1
  });
  test("root中的方法被连续调用", async () => {
    const sub = comp.querySelector("#root") as { dispatchEvent: (arg0: string) => void };
    sub.dispatchEvent("debounced");
    sub.dispatchEvent("debounced");
    sub.dispatchEvent("throttled");
    sub.dispatchEvent("throttled");
    await sleep(0); // 事件触发是异步的，所以需要等待一下
    const data = comp.instance.data;
    void expect(data.debounced).toBe(0); // 默认300ms后执行,所以当前值为0
    void expect(data.throttle).toBe(1); // 立即执行,所以当前值为1
    await sleep(350);
    const data2 = comp.instance.data;
    void expect(data2.debounced).toBe(1); // 只会执行1次,所以当前值为1
    void expect(data2.throttle).toBe(1); // 只会执行1次,所以当前值为1
  });
});
