import simulate from "miniprogram-simulate";
import path from "path";

describe("构建组件时isPage:false是正确的", () => {
  const id = simulate.load(path.resolve(__dirname, "IsComponent"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  const onTap = jest.spyOn(console, "error");

  test("不报错", () => {
    comp.attach(parent);

    // 没有报错行为
    expect(onTap).toHaveBeenCalledTimes(0);
  });
});
