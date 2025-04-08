import { Checking, type Test } from "hry-types";

import { RootComponent } from "../..";
type User = {
  name: string;
  age?: number;
};
RootComponent()({
  data: {
    obj: {} as User | null,
  },
  observers: {
    obj(a) {
      void a;
      void Checking<typeof a, User | null, Test.Pass>;
    },
    "obj.**"(a) {
      void a;
      void Checking<typeof a, User | null, Test.Pass>;
    },
    "obj.age"(a) {
      void a;
      void Checking<typeof a, number, Test.Pass>;
    },
    "obj.name"(a) {
      void a;
      void Checking<typeof a, string, Test.Pass>;
    },
  },
});
