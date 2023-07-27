import { Checking, type Test } from "hry-types";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type {
  Bubbles,
  BubblesCaptureComposed,
  BubblesComposed,
  Capture,
  CaptureComposed,
} from "../../../RootComponent/CustomEvents/CustomEventsTag";
import { SubComponent } from "../..";

type CompDoc = ComponentDoc<{
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

// 返回穿透的自定义事件,并去除了前缀
type SubDocExpect = {
  bubblesComposed: number | BubblesComposed;
  captrueComposed: number | CaptureComposed;
  bubblesCaptrueComposed: number | BubblesCaptureComposed;
};

Checking<typeof SubDoc, SubDocExpect, Test.Pass>;
