import { MainComponent } from "../..";

/**
 *  @description computed字段重复测试
 */
MainComponent({
  properties: {
    aaa: String,
  },
  data: {
    bbb: 123,
  },
  computed: {
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

// 通过了么？
// 第三次
