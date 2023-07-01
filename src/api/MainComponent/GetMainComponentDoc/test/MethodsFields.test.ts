import { ValueChecking } from "hry-types";
import { MainComponent } from "../..";

/**
 * 组件中只有methods字段
 */
const onlyMethodsInComponent = MainComponent({
  methods: {
    M1: (a: string) => a,
  },
});

/**
 * onlyMethodsInComponent的预期类型
 */
type OnlyMethodsInComponentExpect = {
  methods: {
    M1: (a: string) => string;
  };
};

/**
 * 验证 OnlyMethodsInComponentExpect 和 onlyMethodsInComponent 类型是否一致
 */
ValueChecking<OnlyMethodsInComponentExpect>()(onlyMethodsInComponent);

/**
 * 组件中methods字段是空对象时
 */
const methodsIsEmptyObjectInComponent = MainComponent({ methods: {} });

/**
 * methodsIsEmptyObjectInComponent 的预期类型
 */
type MethodsIsEmptyObjectInComponentExpect = {};

/**
 * 验证 methodsIsEmptyObjectInComponentExpect 和 methodsIsEmptyObjectInComponent 类型是否一致
 */
ValueChecking<MethodsIsEmptyObjectInComponentExpect>()(methodsIsEmptyObjectInComponent);

/**
 * 页面中只有methods字段
 */
const onlyMethodsInPage = MainComponent({
  isPage: true,

  methods: {
    M1: (b: number) => b,
  },
});

/**
 * onlyMethodsInPage的预期类型
 */
type OnlyMethodsInPageExpect = {
  isPage: true;
  methods: {
    M1: (b: number) => number;
  };
};

/**
 * 验证 OnlyMethodsInPageExpect 和 onlyMethodsInPage 类型是否一致
 */
ValueChecking<OnlyMethodsInPageExpect>()(onlyMethodsInPage);

/**
 * 页面中methods字段是空对象时
 */
const methodsIsEmptyObjectInPage = MainComponent({ isPage: true, methods: {} });

/**
 * methodsIsEmptyObjectInPage 的预期类型
 */
type MethodsIsEmptyObjectInPageExpect = { isPage: true };

/**
 * 验证 MethodsIsEmptyObjectInPageExpect 和 methodsIsEmptyObjectInPage 类型是否一致
 */
ValueChecking<MethodsIsEmptyObjectInPageExpect>()(methodsIsEmptyObjectInPage);
