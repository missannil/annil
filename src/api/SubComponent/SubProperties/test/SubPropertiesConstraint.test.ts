import { SubComponent } from "../..";

// -----------SubPropertiesConstraint.test------------

// 测试1 文档为any时
type DocIsAny = any;

// 无前缀约束 任意字段
SubComponent<{}, DocIsAny>()({
  properties: {
    str: String,
    num: Number,
  },
});

// 示例文档类型
type $xxxDoc = {
  properties: {
    aaa_str: string;
    aaa_num: number;
    aaa_union: "a" | "b";
    aaa_optional?: string;
    aaa_optionalUnion?: "a" | "b";
    aaa_Union2: "a" | "b" | 1 | 2 | boolean | { name: string } | string[];
  };
};

// test1 有Doc时 不区分可选和必选,都可以配置, 但是必须是Doc中的字段
SubComponent<{}, $xxxDoc>()({
  properties: {
    // 文档中的必传字段可配置为可选
    aaa_str: {
      type: String,
      value: "xxx",
    },
    // 文档中的可选字段可配置为必选
    aaa_optional: String,
    aaa_xxx: String,
  },
});

// 字段类型符合文档中的类型
SubComponent<{}, $xxxDoc>()({
  properties: {
    aaa_num: Number,
    // @ts-expect-error
    aaa_str: Number,
  },
});

// 文档中无properties字段时,字段类型为EmptyObject

SubComponent<{}, { customEvents: { a: string } }>()({
  properties: {
    // @ts-expect-error
    anyFields: 123,
  },
});
