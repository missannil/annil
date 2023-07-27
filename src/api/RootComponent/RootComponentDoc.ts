type _RootComponentDoc = {
  isPage?: true;
  properties?: object;
  data?: object;
  computed?: object;
  customEvents?: object;
  methods?: object;
  events?: object;
};

// 验证key是否合法
type _Validator<O, ErrKeys = Exclude<keyof O, keyof _RootComponentDoc>> = [ErrKeys] extends [never] ? _RootComponentDoc
  : `错误的字段${ErrKeys & string}`;

/**
 * RootComponent Api 返回的类型
 * ```ts
 * RootComponentDoc = {
 * isPage?: true;
 * properties?: object;
 * data?: object;
 * computed?: object;
 * customEvents?: object;
 * methods?: object;
 * events?: object;
 * };
 * ```
 */
export type RootComponentDoc<O extends _Validator<O> = _RootComponentDoc> = O;
