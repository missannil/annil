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
      // @ts-ignore
      expect(error.message).toBe("__computedUpdater__已被内部字段占用");
    }
  });
});
