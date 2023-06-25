import { InstanceInject } from "../../..";

// import { observable } from "mobx";
// import type { InjectDataConstraint, InjectMethodConstraint } from "../InstanceInject";

// const reactiveUser = observable({
//   name: "zhao",
//   age: 18,
// });

// /**
//  *  @description 注入的data
//  */
// const data = {
//   // 响应式数据
//   reactiveUser: () => reactiveUser,
//   // 非响应式数据
//   injectStr: "injectStr",
// } satisfies InjectDataConstraint;
// /**
//  * @description 注入的方法
//  */
// const methods = {
//   injectMethod(data: string) {
//     console.log(data);
//   },
// } satisfies InjectMethodConstraint;
/**
 * @description 注入的配置
 */
const options = {
  addGlobalClass: true,
  multipleSlots: true,
  pureDataPattern: /^_/,
  virtualHost: true,
};

InstanceInject.InjectOption = {
  // data,
  options,
  // methods,
};

// 声明注入类型
// declare module "../../.." {
//   interface InstanceInject {
//     data: typeof data;
//     methods: typeof methods;
//   }
// }
