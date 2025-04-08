import simulate from "miniprogram-simulate";
import path from "path";

describe("内部字段保护", () => {
  test("methods中包含了__computedUpdater__字段--报错", () => {
    try {
      const id = simulate.load(path.resolve(__dirname, "__computedUpdater__"));
      const comp = simulate.render(id);
      const parent = document.createElement("parent-wrapper");

      comp.attach(parent);
    } catch (error) {
      expect((error as Error).message).toBe("methods配置中的__computedUpdater__字段已被内部字段占用");
    }
  });
});
