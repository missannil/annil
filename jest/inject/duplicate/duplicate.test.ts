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

    expect(checkData.behaviors).toStrictEqual([BthrottleDebounce, behavior, BBeforeCreate]);
  });
});
