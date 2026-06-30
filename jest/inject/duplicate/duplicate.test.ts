import simulate from "miniprogram-simulate";
import path from "path";
import { instanceConfig } from "../../../src";
import { BBeforeCreate } from "../../../src/behaviors/BbeforeCreated";

import { BthrottleDebounce } from "../../../src/behaviors/BthrottleDebounce";
export const checkData = {
  options: {} as object | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: {} as any,
  behaviors: [] as string[],
};

const behavior = Behavior({});

// 注入options配置
// @ts-ignore
instanceConfig.setInjectInfo({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    pureDataPattern: /^_/,
    virtualHost: true,
  },
  data: {
    injectStr: "string",
    injectNum: 123,
  },
  methods: {
    injectMethodA(data: string) {
      return data;
    },
    injectMethodB(data: number) {
      return data;
    },
  },
  store: {
    injectTheme: () => "dark",
  },
  behaviors: [behavior],
});

describe("inject数据被组件数据覆盖", () => {
  const id = simulate.load(path.resolve(__dirname, "duplicate"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("注入options、data、behaviors", () => {
    expect(checkData.options).toStrictEqual({
      classPrefix: "main", // miniprogram-simulate 定义的
      addGlobalClass: false,
      multipleSlots: false,
      pureDataPattern: /^__/,
      virtualHost: false,
    });

    expect(checkData.data.injectStr).toBe("changed");
    expect(checkData.data.injectNum).toBe(123);

    expect(checkData.behaviors).toStrictEqual([BthrottleDebounce, behavior, BBeforeCreate]);
  });

  test("注入store被组件store覆盖", () => {
    // 组件自身的store覆盖注入的store（注入返回"dark"，组件覆盖为"light"）
    expect(comp.data.injectTheme).toBe("light");
  });

  test("注入methods被组件methods覆盖，未覆盖的注入methods仍可用", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = comp.instance as any;
    // 组件自身的methods覆盖注入的methods
    expect(instance.injectMethodA("test")).toBe("overridden_by_component");
    // 未覆盖的注入method仍可用
    expect(instance.injectMethodB(42)).toBe(42);
    // 未覆盖的注入data仍可用
    expect(comp.data.injectNum).toBe(123);
  });
});
