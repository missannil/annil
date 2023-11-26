/**
 * 内部保护字段 即不允许配置的字段名(所有方法下)
 */
export const INNERFIELDS = ["disposer"];

/**
 * 报错的形式避免输入字段和内部字段冲突
 */
/* istanbul ignore next */
export function InternalFieldProtection(methodsConfig: object) {
  const fields = ["disposer"];
  const methodsConfigKeys = Object.keys(methodsConfig);
  for (const key of fields) {
    if (methodsConfigKeys.includes(key)) {
      throw Error(`${key}已被内部字段占用`);
    }
  }
}
