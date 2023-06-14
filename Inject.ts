import { InstanceInject } from "./src";

function injectMethod(data: string) {
  console.log(data);
}
// 注入data
const data = {
  // injectStoreAge: () => store.age,
  injectStr: "injectStr",
};
// 注入方法
const methods = {
  injectMethod,
};
InstanceInject.InjectOption = {
  data,
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    pureDataPattern: /^_/,
    virtualHost: true,
  },
  methods,
};
// 声明注入类型
declare module "./src/" {
  interface InstanceInject {
    data: typeof data;
    methods: typeof methods;
  }
}
