import { SubComponent } from "../..";

// 文档有properties字段时,验证前缀 允许写内部字段(即前缀为`_${前缀}`的字段)
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }, "xxx">()({
  data: {
    // 标准字段
    aaaXxx_str: String,
    // 内部字段
    _aaaXxx_num: Number,
    // @ts-expect-error 前缀错误
    err: Boolean,
    // @ts-expect-error 前缀错误
    _xxx_num: Number,
  },
});

// 文档为any时 前缀约束验证
SubComponent<{}, any, "aaa">()({
  data: {
    // 标准字段
    aaa_str: String,
    // 内部字段
    _aaa_num: Number,
    // @ts-expect-error ⚠️前缀应为aaa | _aaa⚠️
    err: Boolean,
    // @ts-expect-error ⚠️前缀应为aaa | _aaa⚠️
    _xxx_num: Number,
  },
});
