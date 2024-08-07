import simulate from "miniprogram-simulate";
import path from "path";

describe("RootComponent-events", () => {
  const id = simulate.load(path.resolve(__dirname, "events"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onTap = jest.spyOn(comp.instance as any, "onTap");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const compA_str = jest.spyOn(comp.instance as any, "compA_str");

  test("events字段 onTap事件", () => {
    comp.attach(parent);

    expect(onTap).toHaveBeenCalledWith("rootEvent-onTap");

    expect(compA_str).toHaveBeenCalledWith("subEvent-compA");
  });
});
