import { Checking, Test } from "hry-types";
import { ReadonlyDeep } from "hry-types/src/Any/_api";
import { User } from "../../../../../jest/common";
import { RootComponent } from "../..";

RootComponent()({
  data: {
    obj: {} as User | null,
  },
  observers: {
    obj(a) {
      Checking<typeof a, ReadonlyDeep<User> | null, Test.Pass>;
    },
    "obj.**"(a) {
      Checking<typeof a, ReadonlyDeep<User> | null, Test.Pass>;
    },
    "obj.age"(a) {
      Checking<typeof a, number, Test.Pass>;
    },
    "obj.name"(a) {
      Checking<typeof a, string, Test.Pass>;
    },
  },
});
