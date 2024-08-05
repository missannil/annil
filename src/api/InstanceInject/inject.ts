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
function injectMethod(data: string) {
  return data;
}

const data = {
  injectStr: "injectStr",
};
const methods = {
  injectMethod,
};
const store = {
  injectTheme: () => themeStore.theme,
};

// 声明注入类型 js开发可以忽略
declare module "../.." {
  interface IInjectInfo {
    data: typeof data;
    store: typeof store;
    methods: typeof methods;
  }
}
