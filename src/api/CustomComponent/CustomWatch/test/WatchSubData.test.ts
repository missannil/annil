import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import { CustomComponent } from "../..";

type CompDoc = ComponentType<{
  properties: {
    aaa_str: string;
    aaa_num: number;
  };
}>;

// 可以为空对象
CustomComponent<{}, CompDoc>()({
  watch: {},
});

/**
 * watch 自身data字段
 */
CustomComponent<{}, CompDoc>()({
  data: {
    aaa_str: "123",

    _aaa_other: 123,
  },
  store: {
    aaa_num: () => 123,
  },
  watch: {
    aaa_str(newValue, oldValue) {
      void oldValue;
      void Checking<"123", typeof newValue, Test.Pass>;

      void Checking<"123", typeof oldValue, Test.Pass>;
    },
    aaa_num(newValue, oldValue) {
      void oldValue;
      void Checking<number, typeof newValue, Test.Pass>;

      void Checking<number, typeof oldValue, Test.Pass>;
    },
    _aaa_other(newValue, oldValue) {
      void oldValue;
      void Checking<number, typeof newValue, Test.Pass>;

      void Checking<number, typeof oldValue, Test.Pass>;
    },
  },
});
