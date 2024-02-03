import { Checking, type Test } from "hry-types";

import type { User } from "../../../../../jest/common";
import { RootComponent } from "../..";

RootComponent()({
  data: {
    obj: {} as User | null,
  },
  observers: {
    obj(a) {
      Checking<typeof a, User | null, Test.Pass>;
    },
    "obj.**"(a) {
      Checking<typeof a, User | null, Test.Pass>;
    },
    "obj.age"(a) {
      Checking<typeof a, number, Test.Pass>;
    },
    "obj.name"(a) {
      Checking<typeof a, string, Test.Pass>;
    },
  },
});
