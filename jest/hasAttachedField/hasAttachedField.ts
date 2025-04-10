import { DefineComponent, RootComponent, typeEqual } from "../../src";

const rootComponent = RootComponent()({
  data: {
    attached: false,
    num: 123,
  },
  computed: {
    test() {
      return this.data.num;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = DefineComponent({
  name: "test",
  rootComponent,
});
typeEqual<typeof test, {}>();
