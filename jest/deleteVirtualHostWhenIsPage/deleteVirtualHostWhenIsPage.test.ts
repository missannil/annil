import simulate from "miniprogram-simulate";
import path from "path";
export const tempObj = { result: false };

describe("页面virtualHost字段会被删除", () => {
  const id = simulate.load(path.resolve(__dirname, "deleteVirtualHostWhenIsPage"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  test("页面virtualHost字段会被删除", () => {
    expect(tempObj.result).toBeTruthy();
  });
});
