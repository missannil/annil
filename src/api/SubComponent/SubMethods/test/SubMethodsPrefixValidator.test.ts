import { SubComponent } from "../..";

// 1.1 默认泛型<{}, any> 忽略检测
SubComponent()({
  methods: {
    xxx() {
      1;
    },
  },
});

// 1.2 有前缀时
SubComponent<{}, any, "aaa">()({
  methods: {
    aaa_xxx() {
      1;
    },
    // @ts-expect-error 前缀错误
    xxx() {
      2;
    },
  },
});

// 2.1  文档有properties字段时,验证前缀
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }>()({
  methods: {
    aaa_xxx() {
      1;
    },
    // @ts-expect-error 前缀错误
    xxx() {
      2;
    },
  },
});

// 2.2  文档有properties字段时,验证前缀
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }, "1">()({
  methods: {
    aaa1_xxx() {
      1;
    },
    // @ts-expect-error 前缀错误
    xxx() {
      2;
    },
  },
});

SubComponent<{}, { customEvents: { aaa_str: string; aaa_num: number } }, "2">()({
  methods: {
    aaa2_xxx() {
      1;
    },
    // @ts-expect-error 前缀错误
    xxx() {
      2;
    },
  },
});
