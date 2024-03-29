import { Checking, type Test } from "hry-types";

import { observable } from "mobx";
import { RootComponent } from "../..";
import type { Mock_User } from "../../Properties/test/normalRequired.test";

const obj = observable({
  gender: <"male" | "female"> "male",
});

/**
 * watch data字段 深度只读
 */
RootComponent()({
  data: {
    num: 123,
    obj: {} as Mock_User,
  },
  store: {
    reactiveLiteral: () => obj.gender,
    reactiveNumber: () => ({} as number),
    reactiveUser: () => ({} as Mock_User),
  },
  watch: {
    num(newValue, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    obj(newValue, oldValue) {
      Checking<Mock_User, typeof newValue, Test.Pass>;

      Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    reactiveNumber(newValue: number, oldValue) {
      Checking<number, typeof newValue, Test.Pass>;

      Checking<number, typeof oldValue, Test.Pass>;
    },
    reactiveLiteral(newValue, oldValue) {
      Checking<"male" | "female", typeof newValue, Test.Pass>;

      Checking<"male" | "female", typeof oldValue, Test.Pass>;
    },
    reactiveUser(newValue, oldValue) {
      Checking<Mock_User, typeof newValue, Test.Pass>;

      Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
  },
});
