import { Checking, type Test } from "hry-types";
import type { Detail, WMBaseEvent, WMCustomEvent } from "../../../../types/officialAlias";
import type { BubblesComposedSign, BubblesSign } from "../../../MainComponent/CustomEvents/SignForCustomEvents";
import { SubComponent } from "../..";

// 1 默认<{},any>时 约束为 EventsConstraint
SubComponent<{}, any>()({
  events: {
    anyFields(e) {
      Checking<WMBaseEvent, typeof e, Test.Pass>;
    },
  },
});

// 2 TComponentDoc["customEvents"]为unknown时 约束为 EmptyObject

SubComponent<{}, { properties: { aaa_str: string } }>()({
  events: {
    // @ts-expect-error EmptyObject
    anyFields(e) {
      e;
    },
  },
});

// TComponentDoc["customEvents"]不为unknown时 约束为customEvents字段函数,有字段提示
type $Doc = {
  customEvents: {
    aaa_str: string;
    aaa_num: number;
    aaa_union: string | number;
    aaa_bubbles: string | BubblesSign;
    aaa_bubblesComposed: number | BubblesComposedSign;
    aaa_never: never;
  };
};

SubComponent<{}, $Doc>()({
  // 有字段提示
  events: {
    aaa_num(e) {
      Checking<WMCustomEvent<number>, typeof e, Test.Pass>;

      Checking<number, typeof e.detail, Test.Pass>;
    },
    aaa_str(e) {
      Checking<WMCustomEvent<string>, typeof e, Test.Pass>;

      Checking<string, typeof e.detail, Test.Pass>;
    },
    aaa_union(e) {
      Checking<WMCustomEvent<string | number>, typeof e, Test.Pass>;

      Checking<string | number, typeof e.detail, Test.Pass>;
    },
    aaa_bubbles(e) {
      Checking<WMCustomEvent<string>, typeof e, Test.Pass>;

      Checking<string, typeof e.detail, Test.Pass>;
    },
    // 默认为 WMCustomEvent<unknown>,可手动添加。
    aaa_never(e: Detail<string>) {
      Checking<WMCustomEvent<string>, typeof e, Test.Pass>;

      Checking<string, typeof e.detail, Test.Pass>;
    },
    aaa_bubblesComposed(e) {
      Checking<WMCustomEvent<number>, typeof e, Test.Pass>;

      Checking<number, typeof e.detail, Test.Pass>;
    },
  },
});

type MainDoc = {
  methods: {
    a: () => void;
  };
  events: {
    b: () => void;
  };
  customEvents: {
    c: string;
  };
};

SubComponent<MainDoc, $Doc>()({
  events: {
    // @ts-expect-error 实例化第一个不为约束字段会报错
    aaa_sss(e) {
      e;
    },
    // @ts-expect-error  约束外字段e类型报错
    aaa_neverssss(e) {
      e;
    },
  },
});
