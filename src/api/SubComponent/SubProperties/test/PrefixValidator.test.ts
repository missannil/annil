import { SubComponent } from "../..";

// 文档有properties字段时,验证前缀
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }, "xxx">()({
  properties: {
    // 标准字段
    aaaXxx_str: String,
    // @ts-expect-error 不可写内部字段
    _aaaXxx_num: Number,
    // @ts-expect-error
    err: Boolean,
    // @ts-expect-error
    _xxx_num: Number,
  },
});

// 文档为any时 前缀约束验证
SubComponent<{}, any, "aaa">()({
  properties: {
    // 标准字段
    aaa_str: String,
    // @ts-expect-error ⚠️前缀应为aaa⚠️
    _aaa_num: Number,
    // @ts-expect-error
    err: Boolean,
    // @ts-expect-error
    _xxx_num: Number,
  },
});

// 无前缀字段 验证不可写内部字段
SubComponent<{}, any>()({
  properties: {
    // 标准字段
    aaa_str: String,
    // @ts-expect-error ⚠️不可写内部字段⚠️
    _aaa_num: Number,
    err: Boolean,
  },
});
