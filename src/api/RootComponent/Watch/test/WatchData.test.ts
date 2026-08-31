import { typeEqual } from "../../../../utils/typeEqual";

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
      void typeEqual<number, typeof newValue>;

      void typeEqual<number, typeof oldValue>;
    },
    obj(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User, typeof newValue>;

      void typeEqual<Mock_User, typeof oldValue>;
    },
    reactiveNumber(newValue: number, oldValue) {
      void oldValue;
      void typeEqual<number, typeof newValue>;
      void typeEqual<number, typeof oldValue>;
    },
    reactiveLiteral(newValue, oldValue) {
      void oldValue;
      void typeEqual<"male" | "female", typeof newValue>;

      void typeEqual<"male" | "female", typeof oldValue>;
    },
    reactiveUser(newValue, oldValue) {
      void oldValue;
      void typeEqual<Mock_User, typeof newValue>;

      void typeEqual<Mock_User, typeof oldValue>;
    },
  },
});
