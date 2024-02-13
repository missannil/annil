import type { ComputedDependence } from "./computedUpdater";
// 相同依赖去重
function sameDependences(dependences: ComputedDependence[]) {
  for (let f = 0; f < dependences.length; f++) {
    const firstPath = dependences[f].paths.toString();
    for (let i = f + 1; i < dependences.length; i++) {
      const curPath = dependences[i].paths.toString();
      if (firstPath === curPath) {
        dependences.splice(f, 1);

        return sameDependences(dependences);
      }
    }
  }

  return dependences;
}
// 当前依赖是上一个依赖的子依赖时,去除上一个依赖
function serialDependences(dependences: ComputedDependence[], basePath: string[]) {
  const lastDependence = dependences[dependences.length - 1];
  if (lastDependence.paths.toString() === basePath.toString()) {
    dependences.pop();
  }

  return dependences;
}
// -2依赖 + -1val === 当前依赖  去除-2依赖
function separatedDependences(dependences: ComputedDependence[], basePath: string[], prop: string) {
  const lastDependence = dependences[dependences.length - 1].val;
  if (
    typeof lastDependence === "string"
    && dependences[dependences.length - 2].paths.concat(lastDependence).toString()
      === basePath.concat(prop).toString()
  ) {
    dependences.splice(dependences.length - 2, 1);
  }

  return dependences;
}

/**
 * 依赖去重
 */
export function uniqueDependences(
  dependences: ComputedDependence[],
  basePath: string[],
  prop: string,
): ComputedDependence[] {
  if (dependences.length === 0) return dependences;
  // 相同依赖去重   例如 [{path:['a','b']}, {path:['a','b']}]  => [{path:['a','b'] }]
  dependences = sameDependences(dependences);

  // 连续依赖去除  当前依赖是上一个依赖的子依赖时,去除上一个依赖
  dependences = serialDependences(dependences, basePath);

  // -2依赖 + -1依赖 === 当前依赖  去除-2依赖
  if (dependences.length >= 2) {
    dependences = separatedDependences(dependences, basePath, prop);
  }

  return dependences;
}
// import type { ComputedDependence } from "./computedUpdater";
// export /**
//  * 依赖去重
//  * @example
//  * ```ts
//  *  const dependences = [{path:['a','b']}, {path:['a','b','c']}, {path:['d','e']}, {path:['d']}]
//  *  const result = uniqueDependences(dependences)
//  *  // result = [{path:['a','b'] } ,{ path:['d'] }]
//  * ```
//  */
// function uniqueDependences(dependences: ComputedDependence[]): ComputedDependence[] {
//   if (dependences.length === 1) return dependences;
//   console.log("外部去重前", dependences);

//   for (let f = 0; f < dependences.length; f++) {
//     const firstPath = dependences[f].paths.join(".") + ".";
//     for (let i = f + 1; i < dependences.length; i++) {
//       const curPath = dependences[i].paths.join(".") + ".";
//       if (firstPath.startsWith(curPath)) {
//         // 例如 path[0] = 'a.b.c.',curPath = 'a.b.'
//         dependences.splice(f, 1);

//         return uniqueDependences(dependences);
//       }
//       if (curPath.startsWith(firstPath)) {
//         // 例如 curPath = 'a.b.' path[0] = 'a.b.c.',
//         dependences.splice(i, 1);

//         return uniqueDependences(dependences);
//       }
//     }
//   }
//   console.log("外部去重后", dependences);

//   return dependences;
// }
