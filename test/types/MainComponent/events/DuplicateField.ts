import { ValueChecking } from "hry-types";
import { MainComponent } from "../../../../src";
import type { WMBaseEvent } from "../../../../src/types/officialAlias";

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
