import simulate from "miniprogram-simulate";
import path from "path";

describe("内部字段保护", () => {
  test("data中包含了__throttleDebounce__字段--报错", () => {
    try {
      const id = simulate.load(path.resolve(__dirname, "__throttleDebounce__"));
      const comp = simulate.render(id);
      const parent = document.createElement("parent-wrapper");

      comp.attach(parent);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe("__throttleDebounce__字段已被内部字段占用");
    }
  });
});
