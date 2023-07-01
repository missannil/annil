import { ValueChecking } from "hry-types";
import { MainComponent } from "../..";

/**
 * 公共的data
 */
const data = {
  reactive: () => 123,
  aaa: "str",
};

/**
 * MainComponent中isPage字段默认类型为false,无isPage字段或为false时表示MainComponent为组件模式。
 * 组件中只有data字段
 */
const onlyDataInComponent = MainComponent({
  data,
});

/**
 * onlyDataInComponent的预期类型
 */
type OnlyDataInComponentExpect = {
  allData: {
    reactive: number;
    aaa: string;
  };
};

/**
 * 验证 OnlyDataInComponentExpect 和 onlyDataInComponent 类型是否一致
 */
ValueChecking<OnlyDataInComponentExpect>()(onlyDataInComponent);

/**
 * 组件中data字段是空对象时
 */
const dataIsEmptyObjectInComponent = MainComponent({ data: {} });

/**
 * dataIsEmptyObjectInComponent 的预期类型
 */
type dataIsEmptyObjectInComponentExpect = {};

/**
 *  验证 dataIsEmptyObjectInComponentExpect 和 dataIsEmptyObjectInComponent 类型是否一致
 */
ValueChecking<dataIsEmptyObjectInComponentExpect>()(dataIsEmptyObjectInComponent);

/**
 * MainComponent中isPage字段为true时表示MainComponent为页面模式。
 * 页面中只有data字段
 */
const onlyDataInPage = MainComponent({
  isPage: true,
  data,
});

/**
 * onlyDataInPage的预期类型
 */
type OnlyDataInPageExpact = {
  isPage: true;
  allData: {
    reactive: number;
    aaa: string;
  };
};

/**
 * 验证 OnlyDataInPageExpact 和 onlyDataInPage 类型是否一致
 */
ValueChecking<OnlyDataInPageExpact>()(onlyDataInPage);

/**
 * 页面中data字段是空对象时
 */
const DataIsEmptyInPage = MainComponent({
  isPage: true,
  data: {},
});

/**
 * DataIsEmptyInPage 的预期类型
 */
type DataIsEmptyInPageExpect = { isPage: true };

/**
 * 验证 DataIsEmptyInPageExpect 和 DataIsEmptyInPage 类型是否一致
 */

ValueChecking<DataIsEmptyInPageExpect>()(DataIsEmptyInPage);
