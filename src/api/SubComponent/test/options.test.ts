import { SubComponent } from "..";

// ---------options.test------------
// 测试1 文档为空对象时
type DocIsEmptyObj = {};

// 配置字段类型为EmptyObject
SubComponent<{}, DocIsEmptyObj>()({});

SubComponent<{}, DocIsEmptyObj>()({
  // @ts-expect-error
  properties: {},
});
