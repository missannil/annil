import simulate from "miniprogram-simulate";
import path from "path";

describe("当页面写isPage:true时", () => {
  const id = simulate.load(path.resolve(__dirname, "IsPage"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  const onTap = jest.spyOn(console, "error");

  test("不报错", () => {
    comp.attach(parent);

    // 没有报错行为
    expect(onTap).toHaveBeenCalledTimes(0);
  });
});
