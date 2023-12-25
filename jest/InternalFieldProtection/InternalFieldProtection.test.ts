import simulate from "miniprogram-simulate";
import path from "path";

describe("内部字段保护", () => {
  test("methods中包含了disposer字段--报错", () => {
    try {
      const id = simulate.load(path.resolve(__dirname, "InternalFieldProtection"));
      const comp = simulate.render(id);
      const parent = document.createElement("parent-wrapper");

      comp.attach(parent);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("disposer已被内部字段占用");
    }
  });
});
