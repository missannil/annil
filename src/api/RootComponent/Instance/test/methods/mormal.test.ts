import { Checking, type Test } from "hry-types";
import { RootComponent } from "../../../../..";

RootComponent()({
  methods: {
    M1() {
      return 1;
    },

    M2(str: string) {
      void Checking<typeof this.M1, () => 1, Test.Pass>;

      void Checking<typeof this.M2, (str: string) => string, Test.Pass>;

      return str;
    },
  },
});
