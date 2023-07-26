import type { SpecificType } from "../../../../types/SpecificType";
import { SubComponent } from "../..";

// 1. 默认泛型<{}, any> properties约束PropertiesConstraint<Literal>,可写任意类型
SubComponent()({
  properties: {
    str: String,
    num: Number,
  },
});

// 2. 文档中无properties字段时,properties约束类型为EmptyObject
SubComponent<{}, { customEvents: { a: string } }>()({
  properties: {
    // @ts-expect-error
    anyFields: 123,
  },
});

// 3. 文档中有properties字段时,properties约束类型为`RestorePropertiesDoc<TComponentDoc["properties"] & {}>`即文档中的properties字段类型的specificType类型

type $TestDoc = {
  properties: {
    aaa_str: string;
    aaa_num: number;
    aaa_union: "a" | "b";
    aaa_optional?: string;
    aaa_optionalUnion?: "a" | "b";
    aaa_Union2: "a" | "b" | 1 | 2 | boolean | { name: string } | string[];
  };
};

// 有字段提示,类型错误报错
SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_num: Number,
    // @ts-expect-error 类型错误
    aaa_str: Number,
  },
});

// 不区分可选和必选,都可以配置,
SubComponent<{}, $TestDoc>()({
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

// 多类型联合时,optionalTypes字段类型为去除type后的剩余类型
SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_Union2: {
      type: String as SpecificType<"a" | "b">,
      value: "a",
      optionalTypes: [Number as SpecificType<1 | 2>],
    },
  },
});

SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_Union2: {
      type: String as SpecificType<"a" | "b">,
      value: "a",
      optionalTypes: [Boolean],
    },
  },
});

SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_Union2: {
      type: String as SpecificType<"a" | "b">,
      value: "a",
      optionalTypes: [Object as SpecificType<{ name: string }>],
    },
  },
});

SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_Union2: {
      type: String as SpecificType<"a" | "b">,
      value: "a",
      optionalTypes: [Array as SpecificType<string[]>],
    },
  },
});

SubComponent<{}, $TestDoc>()({
  properties: {
    aaa_Union2: {
      type: String as SpecificType<"a" | "b">,
      value: "a",
      optionalTypes: [
        Array as SpecificType<string[]>,
        Object as SpecificType<{ name: string }>,
        Boolean,
        Number as SpecificType<1 | 2>,
        // @ts-expect-error 不存在的类型
        Number as SpecificType<3 | 4>,
      ],
    },
  },
});
