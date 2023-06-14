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
    bbb: 123,
  },
  computed: {
    // @ts-expect-error '与注入的data字段重复'
    injectStr() {
      return "与注入的data字段重复";
    },
    // @ts-expect-error '与properties字段重复'
    aaa() {
      return "与properties字段重复";
    },
    // @ts-expect-error "与data字段重复"
    bbb() {
      return "与data字段重复";
    },
  },
});
