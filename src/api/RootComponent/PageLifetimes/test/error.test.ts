import { RootComponent } from "../..";
/**
 *   组件时 非法字段错误
 */
RootComponent()({
  pageLifetimes: {
    show() {
      void 0;
    },
    hide() {
      void 0;
    },
    resize() {
      void 0;
    },
    load(props) {
      void props;
    },
    // @ts-expect-error 1 错误的声明周期
    xxx() {
      void 0;
    },
  },
});

/**
 *  页面时
 */
RootComponent()({
  isPage: true,
  pageLifetimes: {
    onLoad(props) {
      void props;
    },
    // @ts-expect-error 2 错误的声明周期
    xxx() {
      void 0;
    },
  },
});
