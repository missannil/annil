import simulate from "miniprogram-simulate";
import path from "path";
import { instanceConfig } from "../../../src";

export const checkData = {
  options: {} as object | undefined,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: {} as any,
};

const options = {
  addGlobalClass: true,
  multipleSlots: true,
  pureDataPattern: /^_/,
  virtualHost: true,
};

// 注入options配置
// @ts-ignore
instanceConfig.setInjectInfo({
  options,
  data: {
    injectStr: "string",
  },
  store: {
    injectTheme: () => "dark",
  },
});

describe("inject功能测试", () => {
  const id = simulate.load(path.resolve(__dirname, "normal"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("注入options、data、store", () => {
    expect(checkData.options).toStrictEqual({
      classPrefix: "main", // miniprogram-simulate 定义的
      ...options,
    });

    expect(comp.data.injectTheme).toBe("dark");

    expect(comp.data.injectStr).toBe("string");
  });
});
