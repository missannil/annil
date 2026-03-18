type _PageDoc = {
  path: `/${string}`;
  properties?: object;
};

type Error = "{ path: `/${string}`; properties?: object;}";

type _Validator<O> = keyof O extends keyof _PageDoc ? _PageDoc : Error;

/**
 * 页面文档类型
 * ```ts
 * PageDoc = {
 *   path: `/${string}`;
 *   properties?: object;
 * };
 * ```
 */
export type PageDoc<O extends _Validator<O> = _PageDoc> = O;
