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
