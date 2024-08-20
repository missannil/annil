import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import type {
  Bubbles,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
} from "../../../RootComponent/CustomEvents/CustomEventsTag";
import { SubComponent } from "../..";

type CompDoc = ComponentType<{
  properties: {
    aaa_str: string;
  };
  customEvents: {
    aaa_num: number;
    aaa_bubbles: number | Bubbles;
    aaa_bubblesComposed: number | BubblesComposed;
    aaa_captrue: number | Capture;
    aaa_captrueComposed: number | CaptureComposed;
    aaa_bubblesCaptrueComposed: number | BubblesCaptureComposed;
  };
}>;

const SubDoc = SubComponent<{}, CompDoc>()({
  data: {
    aaa_str: "string",
  },
});
void SubDoc;
// 返回穿透的自定义事件,并去除了前缀
type SubDocExpect = {
  bubblesComposed: number | BubblesComposed;
  captrueComposed: number | CaptureComposed;
  bubblesCaptrueComposed: number | BubblesCaptureComposed;
};

Checking<typeof SubDoc, SubDocExpect, Test.Pass>();
// 去除已经声明的穿透事件
const removeCatchedEvents = SubComponent<{}, CompDoc>()({
  data: {
    aaa_str: "string",
  },
  events: {
    aaa_bubblesCaptrueComposed_catch(e) {
      console.log(e);
    },
    aaa_bubblesComposed_catch(e) {
      console.log(e);
    },
    aaa_captrueComposed_catch(e) {
      console.log(e);
    },
  },
});
void removeCatchedEvents;
// 返回穿透的自定义事件,并去除了前缀
type RemoveSubDoc = never;

Checking<typeof removeCatchedEvents, RemoveSubDoc, Test.Pass>();
// 去除有后缀时,已经声明的穿透事件
const removeCatchedEventsOfSuffix = SubComponent<{}, CompDoc, "aa">()({
  data: {
    aaaAa_str: "string",
  },
  events: {
    aaaAa_bubblesCaptrueComposed_catch(e) {
      console.log(e);
    },
    aaaAa_bubblesComposed_catch(e) {
      console.log(e);
    },
    aaaAa_captrueComposed_catch(e) {
      console.log(e);
    },
  },
});
void removeCatchedEventsOfSuffix;
// 返回穿透的自定义事件,并去除了前缀
type RemoveCatchedEventsOfSuffix = never;

Checking<typeof removeCatchedEventsOfSuffix, RemoveCatchedEventsOfSuffix, Test.Pass>();
