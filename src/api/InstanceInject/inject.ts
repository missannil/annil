/* eslint-disable @typescript-eslint/no-unused-vars */
import { observable, runInAction } from "mobx";

// 注入的响应式数据;
const themeStore = observable({ theme: wx.getSystemInfoSync().theme });

wx.onThemeChange((Res) => {
  runInAction(() => {
    themeStore.theme = Res.theme;
  });
});

// 注入的方法;
function injectMethodA(data: string) {
  return data;
}
function injectMethodB(data: number) {
  return data;
}

const data = {
  injectStr: "injectStr",
  injectNum: 123,
};
const methods = {
  injectMethodA,
  injectMethodB,
};
const store = {
  injectTheme: () => themeStore.theme,
};

// 声明注入类型 js开发可以忽略
declare module "../.." {
  interface IInjectInfo {
    [key: string]: unknown;
    data: typeof data;
    store: typeof store;
    methods: typeof methods;
  }
}
