import { RootComponent } from "../..";

RootComponent()({
  lifetimes: {
    beforeCreate() {},
    created() {},
    attached() {},
    ready() {},
    detached() {},
    error(err) {
      err.message;
    },
    moved() {},
    // @ts-expect-error  1 错误的生命周期字段报错
    xxx() {},
  },
});
