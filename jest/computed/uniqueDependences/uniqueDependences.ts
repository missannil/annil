import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  data: {
    obj: {
      a: { list: [1, 2, 3] },
    } as Record<string, { list: any[] } | undefined>,
    id: "0",
  },
  computed: {
    list(): any[] {
      const { obj, id } = this.data;

      return obj[id]?.list || [];
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
