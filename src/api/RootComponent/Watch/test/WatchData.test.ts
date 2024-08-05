import { Checking, type Test } from "hry-types";

import { observable } from "mobx";
import { RootComponent } from "../..";
import type { Mock_User } from "../../Properties/test/normalRequired.test";

const obj = observable({
  gender: "male" as "male" | "female",
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
      void oldValue;
      void Checking<number, typeof newValue, Test.Pass>;

      void Checking<number, typeof oldValue, Test.Pass>;
    },
    obj(newValue, oldValue) {
      void oldValue;
      void Checking<Mock_User, typeof newValue, Test.Pass>;

      void Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
    reactiveNumber(newValue: number, oldValue) {
      void oldValue;
      void Checking<number, typeof newValue, Test.Pass>;
      void Checking<number, typeof oldValue, Test.Pass>;
    },
    reactiveLiteral(newValue, oldValue) {
      void oldValue;
      void Checking<"male" | "female", typeof newValue, Test.Pass>;

      void Checking<"male" | "female", typeof oldValue, Test.Pass>;
    },
    reactiveUser(newValue, oldValue) {
      void oldValue;
      void Checking<Mock_User, typeof newValue, Test.Pass>;

      void Checking<Mock_User, typeof oldValue, Test.Pass>;
    },
  },
});
