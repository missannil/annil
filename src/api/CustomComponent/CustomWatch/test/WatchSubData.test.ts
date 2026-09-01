import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import { typeEqual } from "../../../../utils/typeEqual";
import { CustomComponent } from "../..";

type CompDoc = CreateComponentDoc<"aaa", {
  properties: {
    str: string;
    num: number;
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
      void typeEqual<"123", typeof newValue>;

      void typeEqual<"123", typeof oldValue>;
    },
    aaa_num(newValue, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    _aaa_other(newValue, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
  },
});
