import { Checking, type Test } from "hry-types";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import { SubComponent } from "../..";

type CompDoc = ComponentDoc<{
  properties: {
    aaa_str: string;
    aaa_bool: boolean;
    aaa_num?: number;
  };
}>;

const SubDoc = SubComponent<{}, CompDoc>()({});

// 返回穿透的自定义事件,并去除了前缀
type SubDocExpect = "缺少必传的字段aaa_str、aaa_bool";

Checking<typeof SubDoc, SubDocExpect, Test.Pass>;
