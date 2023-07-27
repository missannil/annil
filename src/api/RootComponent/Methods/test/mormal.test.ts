import { Checking, type Test } from "hry-types";
import { RootComponent } from "../..";

/**
 * 1 有methods时 返回Doc中methods类型与定义相同
 */
const RootDoc = RootComponent()({
  methods: {
    num() {
      return 1;
    },
    str(str: string): string {
      return str;
    },
  },
});

type RootDocExpected = {
  methods: {
    num: () => 1;
    str: (str: string) => string;
  };
};

Checking<typeof RootDoc, RootDocExpected, Test.Pass>;
