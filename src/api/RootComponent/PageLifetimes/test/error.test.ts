import { RootComponent } from "../..";
/**
 *   组件时 非法字段错误
 */
RootComponent()({
  pageLifetimes: {
    show() {},
    hide() {},
    resize() {},
    load(props) {
      props;
    },
    // @ts-expect-error 1 错误的声明周期
    xxx() {},
  },
});

/**
 *  页面时
 */
RootComponent()({
  isPage: true,
  pageLifetimes: {
    onLoad(props) {
      props;
    },
    // @ts-expect-error 2 错误的声明周期
    xxx() {},
  },
});
