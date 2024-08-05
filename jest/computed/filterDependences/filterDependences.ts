import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  data: {
    obj: {
      a: { list: [1, 2, 3] },
    } as Record<string, { list: number[] } | undefined>,
    id: "0",
  },
  computed: {
    list(): number[] {
      // const { obj, id } = this.data;

      return this.data.obj[this.data.id]?.list || [];
    },
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          id: "a",
        });
      }, 100);
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
});
