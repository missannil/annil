import { MainComponent } from "../../../../src/api/MainComponent";

// ----------------重复字段验证----------------
/**
 * 与inject重复类型 对象类型
 */
MainComponent({
  properties: {
    aaa: String,
  },
  data: {
    // @ts-expect-error ⚠️与properties字段重复⚠️
    aaa: 123,
    // @ts-expect-error ⚠️与inject字段重复⚠️"
    injectStr: "str",
  },
});
