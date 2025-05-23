/**
 * 获取指定paths的值
 * @param obj  - 数据对象
 * @param paths - 支持多字段(用`,`分开) 例如 'obj.xxx,a,b.**'
 * @returns unknown[] 每项对应paths每项的值
 */
export function getPathsValue(obj: object, paths: string) {
  const valueList: unknown[] = [];

  // ['obj.xxx','a','b.**'].forEach
  paths.split(",").forEach(path => {
    // path : 'obj.xxx' | 'a' | 'b.**'
    if (path.includes(".**")) {
      // "b.**" => 'b'
      path = path.slice(0, -3);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = path.split(".").reduce((pre: any, path) => {
      // pre有可能为undefined|null,比如obj是未初始化的计算属性(undefined),还有可能是properties的对象类型(默认为null)
      try {
        return pre[path];
      } catch {
        return undefined;
      }
    }, obj);

    valueList.push(value);
  });

  return valueList;
}
