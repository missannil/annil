import type { ComputedDependence } from "./initComputedAndGetCache";

// 删除子依赖
export function removeSubDependences(dependences: ComputedDependence[]) {
  // 把dependences按照路径长度排序
  dependences.sort((a, b) => a.paths.length - b.paths.length);
  // 从最长的路径开始遍历,如果当前路径是上一个路径的子路径,则删除当前路径
  for (let f = 0; f < dependences.length; f++) {
    const sortPath = dependences[f].paths;
    // 从后往前遍历,删除子依赖,保留父依赖
    for (let i = dependences.length - 1; i > f; i--) {
      const curPath = dependences[i].paths;
      // 检查 curPath 是否以 sortPath 开头，并且下一个元素是子路径
      if (curPath.length > sortPath.length && curPath.slice(0, sortPath.length).toString() === sortPath.toString()) {
        dependences.splice(i, 1);
      }
    }
  }
  // 去重
  return dependences.filter((dep, index, self) =>
    index === self.findIndex((t) => (
      t.paths.toString() === dep.paths.toString()
    ))
  );
}
//  const testA = removeSubDependences([{paths: ["test",'aaa']},{paths: ["test"]}]);
//  console.log('testA', testA); // [{paths: ["test"]}]
//  const testB = removeSubDependences([{paths: ["test"]},{paths: ["test",'aaa']},{paths: ["test",'aaa','bbb']}]);
//  console.log('testB', testB); // [{paths: ["test"]}]
//  const testC = removeSubDependences([{paths: ["test"]},{paths: ["test1"]}]);
//  console.log('testC', testC); // [{paths: ["test"]},{paths: ["test1"]}]
//  const testD = removeSubDependences([{paths: ["test"]},{paths: ["test"]}]);
//  console.log('testD', testD); // [{paths: ["test"]}]
// 当前依赖是上一个依赖的子依赖时,去除上一个依赖
export function removePreviousDependence(dependences: ComputedDependence[], basePath: string[]) {
  if (dependences.length === 0 || basePath.length === 0) return dependences;

  const lastDependence = dependences[dependences.length - 1];

  if (lastDependence.paths.toString() === basePath.toString()) {
    dependences.pop();
  }

  return dependences;
}
