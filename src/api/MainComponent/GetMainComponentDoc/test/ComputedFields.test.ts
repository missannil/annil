import { Checking, type Test } from "hry-types";
import { MainComponent } from "../..";

/**
 * MainComponent中isPage字段默认类型为false,无isPage字段或为false时表示MainComponent为组件模式。
 * 组件中只有computed字段
 */
const onlyComputedInComponent = MainComponent({
  computed: {
    CData() {
      return 123;
    },
  },
});

/**
 * onlyComputedInComponent的预期类型
 */
type OnlyComputedInComponentExpect = {
  allData: {
    CData: 123;
  };
};

/**
 * 验证 OnlyComputedInComponentExpect 和 onlyComputedInComponent 类型是否一致
 */
Checking<OnlyComputedInComponentExpect, typeof onlyComputedInComponent, Test.Pass>;

/**
 * 组件中computed字段是空对象时
 */
const computedIsEmptyObjectInComponent = MainComponent({ computed: {} });

/**
 * computedIsEmptyObjectInComponent 的预期类型
 */
type computedIsEmptyObjectInComponentExpect = {};

/**
 * 验证 computedIsEmptyObjectInComponentExpect 和 computedIsEmptyObjectInComponent 类型是否一致
 */
Checking<computedIsEmptyObjectInComponentExpect, typeof computedIsEmptyObjectInComponent, Test.Pass>;

/**
 * MainComponent中isPage字段为true时表示MainComponent为页面模式。
 * 页面中只有computed字段
 */
const onlyComputedInPage = MainComponent({
  isPage: true,
  computed: {
    CData() {
      return "123";
    },
  },
});

/**
 * onlyComputedInPage的预期类型
 */
type OnlyComputedInPageExpect = {
  isPage: true;
  allData: {
    CData: "123";
  };
};

/**
 * 验证 OnlyComputedInPageExpect 和 onlyComputedInPage 类型是否一致
 */
Checking<OnlyComputedInPageExpect, typeof onlyComputedInPage, Test.Pass>;

/**
 * 页面中computed字段是空对象时
 */
const computedIsEmptyObjectInPage = MainComponent({ isPage: true, computed: {} });

/**
 * computedIsEmptyObjectInPage 的预期类型
 */
type ComputedIsEmptyObjectInPageExpect = { isPage: true };

/**
 * 验证 computedIsEmptyObjectInPageExpect 和 computedIsEmptyObjectInPage 类型是否一致
 */
Checking<ComputedIsEmptyObjectInPageExpect, typeof computedIsEmptyObjectInPage, Test.Pass>;
