// 为对象的每个属性添加前缀
// type AddPrefix<O, TPrefix extends string> = O extends unknown ? {
//     [k in keyof O as `${TPrefix}_${k & string}`]: O[k];
//   }
//   : never;
