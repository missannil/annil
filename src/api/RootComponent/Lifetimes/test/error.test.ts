import { RootComponent } from "../..";

RootComponent()({
  lifetimes: {
    beforeCreate() {
      void 0;
    },
    created() {
      void 0;
    },
    attached() {
      void 0;
    },
    ready() {
      void 0;
    },
    detached() {
      void 0;
    },
    error(err) {
      void err.message;
    },
    moved() {
      void 0;
    },
    // @ts-expect-error  1 错误的生命周期字段报错
    xxx() {
      void 0;
    },
  },
});
