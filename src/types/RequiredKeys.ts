/**
 * 获取对象(联合对象)的必选属性
 * @remarks 利用 `{} extends { x?:string }` 为true的特性
 */
export type RequiredKeys<O extends object> = O extends unknown ? {
    [K in keyof O]-?: {} extends Pick<O, K> ? never : K;
  }[keyof O]
  : never;
