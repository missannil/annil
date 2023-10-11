import { Checking, type Test } from "hry-types";

import type { ReadonlyDeep } from "hry-types/src/Any/_api";
import { RootComponent } from "../..";
import type { Mock_User } from "../../Properties/test/normalRequired.test";

/**
 * watch data字段 深度只读
 */
RootComponent()({
  data: {
    num: 123,
    obj: {} as Mock_User,
    reactiveLiteral: () => "str",
    reactiveNumber: () => ({} as number),
    reactiveUser: () => ({} as Mock_User),
  },
  watch: {
    num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    obj(newValue, oldValue) {
      Checking<ReadonlyDeep<Mock_User>, typeof newValue, Test.Pass>;

      Checking<ReadonlyDeep<Mock_User>, typeof oldValue, Test.Pass>;
    },
    reactiveNumber(newValue: number, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    reactiveLiteral(newValue, oldValue) {
      Checking<"str", typeof newValue, Test.Pass>;

      Checking<"str", typeof oldValue, Test.Pass>;
    },
    reactiveUser(newValue, oldValue) {
      Checking<ReadonlyDeep<Mock_User>, typeof newValue, Test.Pass>;

      Checking<ReadonlyDeep<Mock_User>, typeof oldValue, Test.Pass>;
    },
  },
});
