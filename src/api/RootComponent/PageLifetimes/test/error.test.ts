import { RootComponent } from "../..";
/**
 *  1 组件时(无ispage字段或为false),
 */
RootComponent()({
  pageLifetimes: {
    show() {},
    hide() {},
    resize() {},
    load() {},
    // @ts-expect-error 错误的声明周期
    xxx() {},
  },
});

/**
 *  2. 页面时
 */
RootComponent()({
  isPage: true,
  pageLifetimes: {
    onLoad(props) {
      props;
    },
    // @ts-expect-error 错误的声明周期
    xxx() {},
  },
});
