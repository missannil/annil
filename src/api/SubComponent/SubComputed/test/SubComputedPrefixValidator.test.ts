import { SubComponent } from "../..";
// 1.1 默认泛型<{}, any> 忽略检测
SubComponent()({
  computed: {
    xxx_str: () => 123,
    bbb_num: () => "str",
  },
});

// 1.2 有前缀时
SubComponent<{}, any, "xxx">()({
  computed: {
    xxx_str: () => 123,
    // @ts-expect-error ⚠️前缀错误
    bbb_num: () => "str",
  },
});

// 2 文档有properties字段时,验证前缀 允许写内部字段(即前缀为`_${前缀}`的字段)
SubComponent<{}, { properties: { aaa_str: string; aaa_num: number } }, "xxx">()({
  computed: {
    aaaXxx_num: () => 123, // ok
    _aaaXxx_str: () => "str", // ok
    // @ts-expect-error ⚠️前缀错误
    xxx_num: () => 123,
    // @ts-expect-error ⚠️前缀错误
    _xxx_num: () => 123,
  },
});

// 3. 文档为any时 前缀约束验证
SubComponent<{}, any, "aaa">()({
  computed: {
    // 标准字段
    aaa_str: () => "str",
    // 内部字段
    _aaa_num: () => 123,
    // @ts-expect-error ⚠️前缀应为aaa | _aaa⚠️
    err: Boolean,
    // @ts-expect-error ⚠️前缀应为aaa | _aaa⚠️
    _xxx_num: Number,
  },
});
