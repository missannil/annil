import { MainComponent } from "../../../../src/core/MainComponent";

/**
 * 非法字段检测
 */
MainComponent({
  properties: {
    // @ts-expect-error "⚠️与inject重复类型⚠️"
    injectStr: {
      type: String,
      value: "str",
    },
  },
});
