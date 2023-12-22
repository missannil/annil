/**
 * 获取指定paths的值
 * @param this  - 组件实例 Instance
 * @param paths - 支持多字段(用`,`分开) 例如 'obj.xxx,a,b.**' 监控了3个字段
 * @returns unknown[] 每项对应paths每项的值
 */
export function getPathsValue(data: object, paths: string) {
  const valueList: unknown[] = [];

  // ['obj.xxx','a','b.**'].forEach
  paths.split(",").forEach(path => {
    // path : 'obj.xxx' | 'a' | 'b.**'
    if (path.includes(".**")) {
      // "b.**" => 'b'
      path = path.slice(0, -3);
    }
    const value = path.split(".").reduce((pre: any, path) => {
      // pre有可能为undefined|null,比如obj是未初始化的计算属性(undefined),还有可能是properties的对象类型(默认为null)
      try {
        return pre[path];
      } catch (error) {
        return undefined;
      }
    }, data);

    valueList.push(value);
  });

  return valueList;
}
