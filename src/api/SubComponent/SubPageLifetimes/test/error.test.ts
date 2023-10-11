import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type RootDocCompPage = RootComponentDoc<{
  isPage: true;
}>;

type CompDoc = RootComponentDoc<{
  properties: {
    aaa_str: string;
  };
}>;

/**
 * 测试 组件时
 */
SubComponent<{}, CompDoc>()({
  pageLifetimes: {
    // @ts-expect-error 不存在的字段 show是正确字段
    onShow() {},
  },
});

/**
 * 页面时
 */
SubComponent<RootDocCompPage, CompDoc>()({
  pageLifetimes: {
    // @ts-expect-error 不存在的字段 多了一个 `d`
    onLoadd() {},
  },
});
