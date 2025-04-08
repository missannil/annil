export function hasComputedPath(watchPath: string, computedKeys: string[]) {
  return watchPath.split(",").some((path) => {
    const firstPath = path.split(".")[0];
    if (computedKeys.includes(firstPath)) {
      return true;
    }
    return false;
  });
}
