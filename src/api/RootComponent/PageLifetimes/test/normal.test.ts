import { Checking, type Test } from "hry-types";
import { RootComponent, type SpecificType } from "../../../..";

import type { RemoveNullOfRequired } from "../../../../types/RemoveNullOfRequired";
import type { Mock_User } from "../../Properties/test/normalRequired.test";

/**
 * 组件时
 */
RootComponent()({
  // 1  官方类型 加入load类型(同步组件时触发)
  pageLifetimes: {
    hide() {},
    resize(size) {
      Checking<typeof size, WechatMiniprogram.Page.IResizeOption, Test.Pass>;
    },
    show() {},
    // 新增周期函数
    load() {},
  },
});

/**
 * 页面时
 */
RootComponent()({
  isPage: true,
  properties: {
    str: String,
    obj: Object,
    union: {
      type: Object as SpecificType<Mock_User>,
      value: { id: "001", name: "zhao" },
    },
    optionalObject: {
      type: Object as SpecificType<Mock_User | null>,
      value: null,
    },
  },
  // 2 官方是把事件写在methods字段中,更改为写在pageLifetimes字段下
  pageLifetimes: {
    // 3 重写onLoad周期参数props的类型. (propertiesDoc中必传字段去除null后去除可选字段)
    onLoad(props) {
      Checking<
        typeof props,
        Required<
          RemoveNullOfRequired<{
            union?: Mock_User;
            optionalObject?: Mock_User | null;
            str: string;
            obj: object | null;
          }>
        >,
        Test.Pass
      >;
    },
    onHide() {
      console.log("onHide");
    },
  },
});
