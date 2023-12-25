import simulate from "miniprogram-simulate";
import path from "path";

describe("构建组件时isPage:true是错误的", () => {
  const id = simulate.load(path.resolve(__dirname, "IsComponentError"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  const onTap = jest.spyOn(console, "error");

  test("报错", () => {
    comp.attach(parent);

    // 报错1次 `组件 components/compA/compA 中  RootComponent构建组件时,可不写isPage字段或值为 false`
    expect(onTap).toHaveBeenCalledTimes(1);
  });
});
