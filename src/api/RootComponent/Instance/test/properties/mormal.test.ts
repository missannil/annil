import { Checking, type Test } from "hry-types";
import type { ReadonlyDeep } from "hry-types/src/Any/ReadonlyDeep";
import { RootComponent, type SpecificType } from "../../../../..";

RootComponent()({
  properties: {
    obj: Object,
    optionalObj: {
      type: Object as SpecificType<{ name: string }>,
      value: null,
    },
  },
  lifetimes: {
    attached() {
      Checking<typeof this.data.optionalObj, ReadonlyDeep<{ name: string }> | null, Test.Pass>;

      Checking<typeof this.data.obj, object | null, Test.Pass>;
    },
  },
});
