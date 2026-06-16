import { load, render } from "miniprogram-simulate";
import { observable } from "mobx";
import path from "path";

export const storeUser = observable({
  age: 20,
});

test("store getter返回undefined时console.warn警告且字段不可响应", () => {
  const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => void 0);

  const id = load(path.resolve(__dirname, "undefinedReturn"));
  const comp = render(id);
  const parent = document.createElement("parent-wrapper");

  comp.attach(parent);

  // 1. console.warn 被调用，提示 getter 返回了 undefined
  expect(warnSpy).toHaveBeenCalledWith(
    expect.stringContaining("store字段 undefinedField 的getter函数返回了undefined，该字段将不会被注册为响应式字段。"),
  );

  // 2. undefinedField 不在 data 中（setData 未被调用写入该字段）
  expect(comp.instance.data.undefinedField).toBeUndefined();

  // 3. undefinedField 不在 disposer 中（未注册 reaction）
  expect((comp.instance.disposer as unknown as Record<string, unknown>).undefinedField).toBeUndefined();

  // 4. 正常字段 age 仍可响应式更新
  expect(comp.instance.data.age).toBe(20);
  storeUser.age = 21;
  expect(comp.instance.data.age).toBe(21);

  // 5. 即使 observable 变化使 getter 不再返回 undefined，
  //    由于 reaction 已被 dispose，字段不会更新
  storeUser.age = 101;
  expect(comp.instance.data.undefinedField).toBeUndefined();
  expect(comp.instance.data.age).toBe(101);

  warnSpy.mockRestore();
});
