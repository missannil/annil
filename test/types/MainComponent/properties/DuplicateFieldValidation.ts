import { MainComponent } from "../../../../src/api/MainComponent";

// ----------------重复字段验证----------------
/**
 * 与inject重复类型 对象类型
 */
MainComponent({
  properties: {
    // @ts-expect-error "⚠️与inject重复类型⚠️"
    injectStr: {
      type: String,
      value: "str",
    },
    xxx: {
      type: Number,
      optionalTypes: [String],
    },
    yyy: Boolean,
  },
});
