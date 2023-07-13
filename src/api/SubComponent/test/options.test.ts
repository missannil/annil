import { SubComponent } from "..";

// ---------options.test------------
// 测试1 文档为空对象时
type DocIsEmptyObj = {};

// 配置字段可为空对象
SubComponent<{}, DocIsEmptyObj>()({});

// 配置字段不可配置任何字段
SubComponent<{}, DocIsEmptyObj>()({
  // @ts-expect-error
  properties: {},
});
