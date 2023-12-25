import simulate from "miniprogram-simulate";
import path from "path";

describe("页面当做组件创建isPage:false时", () => {
  const id = simulate.load(path.resolve(__dirname, "IsPageError"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  const onTap = jest.spyOn(console, "error");

  test("报错", () => {
    comp.attach(parent);

    // 报错1次 `页面 /pages/index/index 中, RootComponent构建页面时,isPage字段值应为 true`
    expect(onTap).toHaveBeenCalledTimes(1);
  });
});
