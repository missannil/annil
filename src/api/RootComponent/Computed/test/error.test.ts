import { RootComponent } from "../..";

// 1 重复字段
RootComponent()({
  properties: {
    str: String,
  },
  data: {
    num: 123,
  },
  computed: {
    // @ts-expect-error '与properties字段重复'
    str(): string {
      return "与properties字段重复";
    },
    // @ts-expect-error "与data字段重复"
    num(): string {
      return "与data字段重复";
    },
  },
});

// 2 循环引用
RootComponent()({
  computed: {
    // @ts-expect-error  相互引用
    str() {
      // @ts-expect-error 相互引用
      return this.data.num;
    },
    // @ts-expect-error 相互引用
    num() {
      // @ts-expect-error 相互引用
      return this.data.str;
    },
  },
});
// 3 、实例上不存在的字段应该报错
RootComponent()({
  computed: {
    str(): number {
      // @ts-expect-error 不存在的字段
      return this.data.numd;
    },
    other(): string {
      // @ts-expect-error 不存在的字段
      return this.func;
    },
  },
});
