import { SubComponent } from "../..";

// 1.1 默认泛型<{}, any> 忽略检测
SubComponent()({
  properties: {
    xxx_str: String,
    bbb_num: Number,
  },
});

// 1.2 有前缀时
SubComponent<{}, any, "xxx">()({
  properties: {
    xxx_str: String,
    // @ts-expect-error ⚠️前缀错误
    bbb_num: Number,
  },
});

// 2.1  文档有properties字段时,验证前缀
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }>()({
  properties: {
    aaa_str: String, // ok
    // @ts-expect-error ⚠️前缀错误
    xxx_num: Number,
  },
});

// 2.2  文档有properties字段时,验证前缀
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }, "xxx">()({
  properties: {
    aaaXxx_str: String, // ok
    // @ts-expect-error ⚠️前缀错误
    _aaaXxx_num: Number,
  },
});

SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }, "xxx">()({
  properties: {
    aaaXxx_str: String, // ok
    // @ts-expect-error ⚠️前缀错误
    _aaaXxx_num: Number,
  },
});
