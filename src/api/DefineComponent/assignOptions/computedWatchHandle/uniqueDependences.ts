import type { ComputedDependence } from "./computedUpdater";

export /**
 * 依赖去重
 * @example
 * ```ts
 *  const dependences = [{path:['a','b']}, {path:['a','b','c']}, {path:['d','e']}, {path:['d']}]
 *  const result = uniqueDependences(dependences)
 *  // result = [{path:['a','b'] } ,{ path:['d'] }]
 * ```
 */
function uniqueDependences(dependences: ComputedDependence[]): ComputedDependence[] {
  if (dependences.length === 1) return dependences;
  for (let f = 0; f < dependences.length; f++) {
    const firstPath = dependences[f].paths.join(".") + ".";
    for (let i = f + 1; i < dependences.length; i++) {
      const curPath = dependences[i].paths.join(".") + ".";
      if (firstPath.startsWith(curPath)) {
        // 例如 path[0] = 'a.b.c.',curPath = 'a.b.'
        dependences.splice(f, 1);

        return uniqueDependences(dependences);
      }
      if (curPath.startsWith(firstPath)) {
        // 例如 curPath = 'a.b.' path[0] = 'a.b.c.',
        dependences.splice(i, 1);

        return uniqueDependences(dependences);
      }
    }
  }

  return dependences;
}
