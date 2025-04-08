import { Checking, type Test } from "hry-types";
import { type DetailedType, RootComponent } from "../../../..";

import type { Mock_User } from "../../Properties/test/normalRequired.test";
type User = {
  name: string;
  age?: number;
};
/**
 * 组件时
 */
RootComponent()({
  pageLifetimes: {
    hide() {
      void 0;
    },
    resize(size) {
      void size;
      void Checking<typeof size, WechatMiniprogram.Page.IResizeOption, Test.Pass>;
    },
    show() {
      void 0;
    },
    // 1 glass-easel(最低版本库3.0.2)支持的周期函数
    load(obj) {
      void obj;
      void Checking<typeof obj, object | undefined, Test.Pass>;
    },
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
      type: Object as DetailedType<Mock_User>,
      value: { id: "001", name: "zhao" },
    },
    optionalObject: {
      type: Object as DetailedType<Mock_User | null>,
      value: null,
    },
  },
  // 2 官方是把事件写在methods字段中,更改为写在pageLifetimes字段下
  pageLifetimes: {
    // 3 重写onLoad周期参数props的类型(同页面properties定义类型).
    onLoad(props) {
      void props;
      void Checking<
        typeof props,
        {
          union?: Mock_User;
          optionalObject?: Mock_User | null;
          str: string;
          obj: object;
        },
        Test.Pass
      >;
    },
    onHide() {
      console.log("onHide");
    },
    // onReady
    // onResize
    // onUnload
    // onPageScroll
    // onPullDownRefresh
    // onReachBottom
    // onShareAppMessage
    // onShareTimeline
    // onTabItemTap
    // ...
  },
});
// prop中必传对象没有null,但在实例中却需要有null
RootComponent()({
  isPage: true,
  properties: {
    optionalObj: {
      type: Object,
      value: {},
    },
    requiredObj: Object as DetailedType<User>,
  },

  pageLifetimes: {
    onLoad(prop) {
      void prop;
      // 页面外部传值时没必要传null,组件时有需要的。
      void Checking<typeof prop.requiredObj, User, true>;
      // 虽然传值不应该是null,但由于实例建立时默认为null,所以实例类型加上null
      void Checking<typeof this.data.requiredObj, User, true>;
      // 页面传入的可选对象不需要null,有undefined
      void Checking<typeof prop.optionalObj, object | undefined, true>;
      // 实例中的可选对象不需要null,有默认值。
      void Checking<typeof this.data.optionalObj, object, true>;
    },
  },
});
