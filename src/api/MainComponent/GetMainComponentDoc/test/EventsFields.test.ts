import { Checking, type Test } from "hry-types";
import type { WMBaseEvent } from "../../../../types/officialAlias";
import { MainComponent } from "../..";

/**
 * 组件中只有events字段
 */
const onlyEventsInComponent = MainComponent({
  events: {
    ontap: (e) => e.currentTarget.id,
  },
});

/**
 * onlyEventsInComponent的预期类型
 */
type OnlyEventsInComponentExpect = {
  events: {
    ontap: (e: WMBaseEvent) => string;
  };
};

/**
 * 验证 OnlyEventsInComponentExpect 和 onlyEventsInComponent 类型是否一致
 */
Checking<OnlyEventsInComponentExpect, typeof onlyEventsInComponent, Test.Pass>;

/**
 * 组件中events字段是空对象时
 */
const eventsIsEmptyObjectInComponent = MainComponent({ events: {} });

/**
 * eventsIsEmptyObjectInComponent 的预期类型
 */
type EventsIsEmptyObjectInComponentExpect = {};

/**
 * 验证 eventsIsEmptyObjectInComponentExpect 和 eventsIsEmptyObjectInComponent 类型是否一致
 */
Checking<EventsIsEmptyObjectInComponentExpect, typeof eventsIsEmptyObjectInComponent, Test.Pass>;

/**
 * 页面中只有events字段
 */
const onlyEventsInPage = MainComponent({
  isPage: true,
  events: {
    A() {
      return "123";
    },
  },
});

/**
 * onlyEventsInPage的预期类型
 */
type OnlyEventsInPageExpect = {
  isPage: true;
  events: {
    A: () => string;
  };
};

/**
 * 验证 OnlyEventsInPageExpect 和 onlyEventsInPage 类型是否一致
 */
Checking<OnlyEventsInPageExpect, typeof onlyEventsInPage, Test.Pass>;

/**
 * 页面中events字段是空对象时
 */
const eventsIsEmptyObjectInPage = MainComponent({ isPage: true, events: {} });

/**
 * eventsIsEmptyObjectInPage 的预期类型
 */
type EventsIsEmptyObjectInPageExpect = { isPage: true };

/**
 * 验证 EventsIsEmptyObjectInPageExpect 和 eventsIsEmptyObjectInPage 类型是否一致
 */
Checking<EventsIsEmptyObjectInPageExpect, typeof eventsIsEmptyObjectInPage, Test.Pass>;
