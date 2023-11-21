import { Checking, type Test } from "hry-types";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import { SubComponent } from "../..";

type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: string;
    aaa_num: number;
  };
}>;

// 可以为空对象
SubComponent<{}, CompDoc>()({
  watch: {},
});

/**
 * watch 自身data字段
 */
SubComponent<{}, CompDoc>()({
  data: {
    aaa_str: "123",

    _aaa_other: 123,
  },
  state: {
    aaa_num: () => 123,
  },
  watch: {
    aaa_str(newValue, oldValue) {
      Checking<"123", typeof newValue, Test.Pass>;

      Checking<"123", typeof oldValue, Test.Pass>;
    },
    aaa_num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    _aaa_other(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
  },
});
