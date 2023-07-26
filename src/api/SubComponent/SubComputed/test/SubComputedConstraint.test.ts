import { SubComponent } from "../..";

// 1. 默认泛型<{},any>时, 约束为 `Record<string, () => void>`
SubComponent()({
  computed: {
    num() {
      return 1;
    },
    str() {
      return "1";
    },
  },
});

// 2. Doc 无"properties"字段时,约束为 `EmptyObject`
SubComponent<{}, { customEvents: { a: string } }>()({
  computed: {},
});

SubComponent<{}, { customEvents: { a: string } }>()({
  computed: {
    // @ts-expect-error 约束为空对象类型
    num() {
      return 1;
    },
  },
});

// 3. Doc 有"properties"字段时,约束为 去除properties和data后的剩余字段,有字段提示。

type $TestDoc = {
  properties: {
    aaa_num: number;
    aaa_str: string;
    aaa_Union: "a" | "b";
  };
};

SubComponent<{}, $TestDoc>()({
  // 输入aaa 提示 3个字段
  computed: {
    aaa_num: () => 1,
    aaa_str: () => "1",
    aaa_Union: () => ("a" as const), // or  () => ("b" as const),
  },
});

SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_num: Number,
  },
  // 输入aaa 提示 2个字段
  computed: {
    aaa_str: () => "1",
    aaa_Union: () => ("a" as const), // or  () => ("b" as const),
  },
});

SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_num: Number,
  },
  data: {
    aaa_str: () => "str",
  },
  // 输入aaa 提示 1个字段
  computed: {
    aaa_Union: () => ("a" as const), // or  () => ("b" as const),
  },
});
