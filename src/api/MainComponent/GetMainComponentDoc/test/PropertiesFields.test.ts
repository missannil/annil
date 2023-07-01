import { type AnyObject, ValueChecking } from "hry-types";

import type { SpecificType } from "../../../../common_types/SpecificType";
import { MainComponent } from "../..";
import type { Mock_Cart, Mock_User } from "../../Properties/test/PropertiesConstraint.test";

/**
 * 公用的properties字段
 */
const properties = {
  str: String,
  obj: Object,
  num: Number as SpecificType<0 | 1 | 2>,
  bool: Boolean,
  arr: Array as SpecificType<number[] | string[]>,
  optional: {
    type: Object as SpecificType<Mock_User | Mock_Cart>,
    value: { id: "001", name: "zhao" },
  },
  unionRequired: {
    type: String,
    optionalTypes: [Number],
  },
};

/**
 * MainComponent中isPage字段默认类型为false,无isPage字段或为false时表示MainComponent为组件模式。
 * 组件中只有properties字段
 */
const onlyPropertiesInComponent = MainComponent({
  properties,
});

/**
 * onlyPropertiesInComponent的预期类型
 */
type OnlyPropertiesInComponentExpect = {
  properties: {
    str: string;
    obj: AnyObject | null;
    num: 0 | 1 | 2;
    bool: boolean;
    arr: number[] | string[];
    optional?: Mock_Cart | Mock_User;
    unionRequired: string | number;
  };
  allData: {
    str: string;
    obj: AnyObject | null;
    num: 0 | 1 | 2;
    bool: boolean;
    arr: number[] | string[];
    optional: Mock_Cart | Mock_User; // required
    unionRequired: string | number;
  };
};

/**
 * 验证 OnlyPropertiesInComponentExpect 和 onlyPropertiesInComponent 类型是否一致
 */
ValueChecking<OnlyPropertiesInComponentExpect>()(onlyPropertiesInComponent);

/**
 * 组件中properties字段是空对象时
 */
const properitesIsEmptyObjectInComponent = MainComponent({ properties: {} });

/**
 * properitesIsEmptyObjectInComponent 的预期类型
 */
type ProperitesIsEmptyObjectInComponentExpect = {};

/**
 *  验证 ProperitesIsEmptyObjectInComponentExpect 和 properitesIsEmptyObjectInComponent 类型是否一致
 */
ValueChecking<ProperitesIsEmptyObjectInComponentExpect>()(properitesIsEmptyObjectInComponent);

/**
 * MainComponent中isPage字段为true时表示MainComponent为页面模式。
 * 页面中只有properties字段
 */
const onlyPropertiesInPage = MainComponent({
  isPage: true,
  properties,
});

/**
 * onlyPropertiesInPage的预期类型
 */
type PropertiesInPageExpact = {
  isPage: true;
  properties: {
    str: string;
    obj: AnyObject | null;
    num: 0 | 1 | 2;
    bool: boolean;
    arr: number[] | string[];
    optional?: Mock_Cart | Mock_User;
    unionRequired: string | number;
  };
  allData: {
    str: string;
    obj: AnyObject | null;
    num: 0 | 1 | 2;
    bool: boolean;
    arr: number[] | string[];
    optional: Mock_Cart | Mock_User; // required
    unionRequired: string | number;
  };
};

/**
 * 验证 PropertiesInPageExpact 和 onlyPropertiesInPage 类型是否一致
 */
ValueChecking<PropertiesInPageExpact>()(onlyPropertiesInPage);

/**
 * 页面中properties字段是空对象时
 */
const ProperitesIsEmptyInPage = MainComponent({
  isPage: true,
  properties: {},
});

/**
 * ProperitesIsEmptyInPage 的预期类型
 */
type ProperitesIsEmptyInPageExpect = { isPage: true };

/**
 * 验证 ProperitesIsEmptyInPageExpect 和 ProperitesIsEmptyInPage 类型是否一致
 */

ValueChecking<ProperitesIsEmptyInPageExpect>()(ProperitesIsEmptyInPage);
