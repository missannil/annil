import simulate from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";
import { instanceConfig } from "../../../src";

export const checkData = {
  options: {},
  data: {},
};

const options = {
  addGlobalClass: true,
  multipleSlots: true,
  pureDataPattern: /^_/,
  virtualHost: true,
};
const store = observable({
  themeMode: "dark" as "dark" | "light",
  changeTheme() {
    this.themeMode = this.themeMode === "dark" ? "light" : "dark";
  },
});
// 注入options配置
// @ts-ignore
instanceConfig.setInjectInfo({
  options,
  data: {
    injectStr: "string",
  },
  store: {
    injectTheme: () => store.themeMode,
  },
});

describe("inject功能测试", () => {
  const id = simulate.load(path.resolve(__dirname, "normal"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("注入options、data、store", () => {
    // 1. options被正确注入
    expect(checkData.options).toStrictEqual({
      classPrefix: "main", // miniprogram-simulate 定义的
      ...options,
    });
    // 2. data被正确注入
    expect(comp.data.injectStr).toBe("string");
    // 3. store被正确注入且响应式
    expect(comp.data.injectTheme).toBe("dark");
    store.changeTheme();
    expect(comp.data.injectTheme).toBe("light");
  });
});
