import type { DetailedType } from "../../../../types/DetailedType";
import { RootComponent } from "../..";
// 1 没有data可以watch 约束为EmptyObject
RootComponent()({
  watch: {
    // @ts-expect-error 无可监控字段时，约束为EmptyObject,即不可写任何字段
    xxx() {
      void 0;
    },
  },
});

/**
 * 2  超出约束字段报错
 */
RootComponent()({
  properties: {
    num: Number,
  },
  data: {
    str: "123",
  },
  computed: {
    Cnum() {
      return this.data.num;
    },
  },
  watch: {
    // @ts-expect-error otherFields不在约束字段(num,str,Cnum)中
    otherFields() {
      void 0;
    },
  },
});
/**
 * 3  对象联合null的类型 不能watch子字段
 */
RootComponent()({
  properties: {
    user: Object as DetailedType<{ name: string; age: number } | null>,
  },

  watch: {
    user(newValue, oldValue) {
      void oldValue;
      void newValue;
    },
    // @ts-expect-error 不能watch子字段 因为user可能为null
    "user.name"(newValue, oldValue) {
      void oldValue;
      void newValue;
    },
  },
});
