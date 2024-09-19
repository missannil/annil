import simulate from "miniprogram-simulate";
import path from "path";

describe("path值验证", () => {
  const id = simulate.load(path.resolve(__dirname, "pagePathCheck"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  const onTap = jest.spyOn(console, "error");

  test("报错", () => {
    comp.attach(parent);
    expect(onTap).toHaveBeenCalledTimes(1);
  });
});
