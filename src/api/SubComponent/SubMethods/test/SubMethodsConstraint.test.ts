import { Checking, type Test } from "hry-types";
import type { Extends } from "hry-types/src/Any/Extends";
import type { BubblesSign } from "../../../MainComponent/CustomEvents/SignForCustomEvents";
import { SubComponent } from "../..";

// Record<string,Function> 约束测试

// 默认时
SubComponent()({
  methods: {
    xxx(n: number) {
      return n + 1;
    },
    yyy() {
      return this.xxx(1) + 1;
    },
  },
});

SubComponent()({
  methods: {
    // @ts-expect-error 类型错误
    zzz: 123,
  },
});

// 有Doc时
type $Doc = {
  properties: { a: string; num?: number };
  customEvents: { a: string; num: number | BubblesSign };
};

Checking<Extends<$Doc, { properties: object; customEvents: object }>, true, Test.Pass>;

SubComponent<{}, $Doc>()({
  methods: {
    xxx(n: number) {
      return n + 1;
    },
    yyy() {
      return this.xxx(1) + 1;
    },
  },
});

SubComponent<{}, $Doc>()({
  methods: {
    // @ts-expect-error 类型错误
    zzz: 123,
  },
});
