import { Checking, type Test } from "hry-types";
import type { ComponentType } from "../../../DefineComponent/ReturnType/ComponentType";
import { SubComponent } from "../..";

type CompDoc = ComponentType<{
  properties: {
    aaa_str: string;
    aaa_bool: boolean;
    aaa_num?: number;
  };
}>;

const SubDoc = SubComponent<{}, CompDoc>()({});
void SubDoc;
// 返回穿透的自定义事件, 并去除了前缀
type SubDocExpect = "缺少必传的字段aaa_str、aaa_bool";

Checking<typeof SubDoc, SubDocExpect, Test.Pass>();
