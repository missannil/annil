import simulate from "miniprogram-simulate";
import path from "path";

describe("内部字段保护", () => {
  test("data中包含了__computedCache__字段--报错", () => {
    try {
      const id = simulate.load(path.resolve(__dirname, "__computedCache__"));
      const comp = simulate.render(id);
      const parent = document.createElement("parent-wrapper");

      comp.attach(parent);
    } catch (error) {
      expect((error as Error).message).toBe("data配置中的__computedCache__字段已被内部字段占用");
    }
  });
});
