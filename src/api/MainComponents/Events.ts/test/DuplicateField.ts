import { ValueChecking } from "hry-types";
import { MainComponent } from "../../../..";
import type { WMBaseEvent } from "../../../../common_types/officialAlias";

/**
 * 重复字段验证
 */
MainComponent({
  events: {
    aaa(e) {
      ValueChecking<WMBaseEvent>()(e);
    },
    // @ts-expect-error 与注入的methods字段重复
    injectMethod(e) {
      e;
    },
  },
});
