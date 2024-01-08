// import type mobx from "mobx";
// import type { FinalOptionsOfComponent } from "../collectOptionsForComponent";
// export function storeDataHandle(options: FinalOptionsOfComponent) {
//   // 初始化store
//   const storeConfig = options.store;
//   if (!storeConfig) return;
//   const { toJS, comparer, reaction } = require("mobx") as typeof mobx;

//   options.data.__disposer__ = {};

//   for (const key in storeConfig) {
//     options.data[key] = toJS(storeConfig[key]());

//     options.data.__disposer__[key] = reaction(storeConfig[key], (value: unknown) => {

//       // @ts-ignore  加入到待setData对象中
//       this.setData({
//         [key]: toJS(value),
//       });
//     }, {
//       equals: comparer.structural,
//     });

//     options.methods.disposer = function(key: keyof typeof storeConfig) {

//       this.data.__disposer__[key].call(this);
//     };
//   }
//   delete options.store;
// }
