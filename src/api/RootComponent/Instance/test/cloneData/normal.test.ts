import { Checking, type Test } from "hry-types";
import type { _ReadonlyDeep } from "hry-types/src/Any/ReadonlyDeep";
import type { DetailedType } from "../../../../..";
import { RootComponent } from "../../..";

interface User {
  readonly id: number;
  readonly name: string;
  slected: boolean;
}

RootComponent()({
  properties: {
    num: Number,
    obj: Object as DetailedType<User>,
  },
  data: {
    str: "123",
    arr: [{}] as User[],
  },

  methods: {
    M1() {
      Checking<
        typeof this.data,
        _ReadonlyDeep<
          {
            injectTheme: "dark" | "light" | undefined;
            injectStr: string;
            str: string;
            arr: User[];
            num: number;
            obj: User | null;
          }
        >,
        Test.Pass
      >;

      Checking<
        typeof this.cloneData,
        {
          injectTheme: "dark" | "light" | undefined;
          injectStr: string;
          str: string;
          arr: User[];
          num: number;
          obj: User | null;
        },
        Test.Pass
      >;
    },
  },
});
