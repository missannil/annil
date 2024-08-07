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
