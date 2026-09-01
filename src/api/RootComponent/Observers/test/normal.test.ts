import { typeEqual } from "../../../../utils/typeEqual";

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
      void typeEqual<typeof a, User | null>;
    },
    "obj.**"(a) {
      void a;
      void typeEqual<typeof a, User | null>;
    },
    "obj.age"(a) {
      void a;
      void typeEqual<typeof a, number>;
    },
    "obj.name"(a) {
      void a;
      void typeEqual<typeof a, string>;
    },
  },
});
