// 为对象的每个属性添加前缀
export type AddPrefix<O, TPrefix extends string> = O extends unknown ? {
    [k in keyof O as `${TPrefix}_${k & string}`]: O[k];
  }
  : never;
