import { Checking, type Test } from "hry-types";
import type { Mock_User } from "../../../RootComponent/Properties/expected/normalRequired";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";

type RootDocComp = RootComponentDoc<{
  properties: {
    union?: Mock_User;
    optionalObject?: Mock_User | null;
    str: string;
    obj: object | null;
  };
}>;

type RootDocCompPage = RootComponentDoc<{
  isPage: true;
  properties: {
    union?: Mock_User;
    optionalObject?: Mock_User | null;
    str: string;
    obj: object | null;
  };
}>;

type CompDoc = RootComponentDoc<{
  properties: {
    aaa_str: string;
  };
  customEvents: {
    aaa_num: number;
  };
}>;

/**
 * 测试 组件时
 */
SubComponent<RootDocComp, CompDoc>()({
  pageLifetimes: {
    hide() {},
    load() {},
    resize(size) {
      Checking<typeof size, WechatMiniprogram.Page.IResizeOption, Test.Pass>;
    },
    show() {},
  },
});

/**
 * 页面时
 */
SubComponent<RootDocCompPage, CompDoc>()({
  pageLifetimes: {
    onLoad(props) {
      // 接受的必传properties字段,不应该有null
      Checking<
        typeof props,
        {
          str: string;
          obj: object;
          union: Mock_User;
          optionalObject: Mock_User | null;
        },
        Test.Pass
      >;
    },
    onHide() {
      console.log("onHide");
    },
    onResize(options) {
      console.log("onResize", options);
    },
  },
});
