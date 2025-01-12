import simulate from "miniprogram-simulate";
import path from "path";

describe("slot数据", () => {
  const id = simulate.load(path.resolve(__dirname, "allDatas"));
  const comp = simulate.render(id);
  const parent = document.createElement("parent-wrapper");
  comp.attach(parent);
  test("Root-allDatas", () => {
    expect(comp.instance.data.num).toBe(0);
    expect(comp.instance.data.user).toBe(null);
    expect(comp.instance.data.count).toBe(100);
    expect(comp.instance.data.str).toBe("c");
    expect(comp.instance.data._str).toBe("_str");
  });
  test("subComp-allDatas", () => {
    expect(comp.instance.data.xxx_num).toBe(1);

    expect(comp.instance.data.xxx_user).toBe(null);
    expect(comp.instance.data._xxx_str).toBe("d");
    expect(comp.instance.data._xxx_num).toBe(123);
  });
  test("slot-data", () => {
    expect(comp.instance.data.slot_num).toBe(123);

    expect(comp.instance.data.slot_str).toBe("a");
  });
  test("slot-store", () => {
    expect(comp.instance.data._slot_num).toBe(456);

    expect(comp.instance.data._slot_str).toBe("b");
  });
  test("slot-data", () => {
    expect(comp.instance.data.slot_count).toBe(680);

    expect(comp.instance.data._slot_Cstr).toBe("ab_strd");
  });
});
