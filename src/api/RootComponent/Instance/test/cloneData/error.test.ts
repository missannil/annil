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
    user: Object as DetailedType<User>,
  },
  data: {
    str: "123",
    arr: [{}] as User[],
  },

  methods: {
    M1() {
      const cloneData = this.cloneData;

      // @ts-expect-error 尽管cloneData去除了readonly，user.id属性依然是readonly
      cloneData.user!.id = 1;

      // @ts-expect-error arr[0].name属性依然是readonly
      cloneData.arr[0].name = "zhao";
    },
  },
});
