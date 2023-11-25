import { RootComponent } from "../..";
/**
 *  1 组件时(无ispage字段或为false),
 */
RootComponent()({
  lifetimes: {
    // beforeCreate() {},

    created() {},

    attached() {},

    ready() {},

    detached() {},

    error(err) {
      err.cause;
    },
    moved() {},
    // @ts-expect-error  错误的声明周期字段报错
    xxx() {},
  },
});

/**
 *  2. 页面时 不开启lifetimes字段
 */
RootComponent()({
  isPage: true,
  // @ts-expect-error 页面时未开启此字段
  lifetimes: {},
});
