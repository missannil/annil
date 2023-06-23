import { MainComponent } from "../..";

/**
 * 重复字段验证
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
