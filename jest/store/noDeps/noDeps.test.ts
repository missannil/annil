import { load, render } from "miniprogram-simulate";
import path from "path";

test("store getter无observable依赖时应抛出错误", () => {
  const errorSpy = jest.spyOn(console, "error").mockImplementation(() => void 0);

  const id = load(path.resolve(__dirname, "noDeps"));
  const comp = render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  // 错误被 exparser safeCallback 捕获后输出到 console.error
  expect(errorSpy).toHaveBeenCalledWith(
    expect.stringContaining("store字段"),
  );
  expect(errorSpy).toHaveBeenCalledWith(
    expect.stringContaining("getter函数没有依赖任何响应式数据"),
  );

  errorSpy.mockRestore();
});
