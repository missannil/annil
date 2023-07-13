// * @returns 当TCurrentComponentDoc为{}时(即传入的TComponentDoc为any) 返回 object
// * @returns 当TCurrentComponentDoc["properties"]为unknown时,返回  EmptyObject
// * @returns 当TCurrentComponentDoc["properties"]不为unknown时,返回 去除properties剩余字段和内部字段

import { SubComponent } from "../..";

// 测试1 当TCurrentComponentDoc为{}时(即传入的TComponentDoc为any) 返回 object

SubComponent()({
  data: {
    anyFields: 123,
    activeData: () => 123,
  },
});

// 测试2 当TCurrentComponentDoc["properties"]为unknown时,返回  EmptyObject

SubComponent<{}, { customEvents: { aaa_A: string } }>()({
  data: {
    // @ts-expect-error  只能写空对象
    anyFields: 123,
  },
});

// 测试3 当TCurrentComponentDoc["properties"]不为unknown时,返回 去除properties剩余字段

SubComponent<{}, { properties: { aaa_str: string; aaa_num?: number } }>()({
  data: {
    aaa_num: 123,
    aaa_str: () => "123",
  },
});

// 测试4 去除properties剩余字段为空对象时 data约束为EmptyObject
SubComponent<{}, { properties: { aaa_str: string; aaa_num?: number } }>()({
  properties: {
    aaa_num: Number,
    aaa_str: String,
  },
  data: {
    // @ts-expect-error 约束为EmptyObject
    aaa_num: 123,
  },
});
