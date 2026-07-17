import { Checking, type Test } from "hry-types";
import type { CreateComponentDoc } from "../../../../types/CreateComponentDoc";
import { CustomComponent } from "../..";

type CompDoc = CreateComponentDoc<"aaa", {
  properties: {
    str: string;
    bool: boolean;
    num?: number;
  };
}>;

const SubDoc = CustomComponent<{}, CompDoc>()({});
void SubDoc;
// 返回穿透的自定义事件, 并去除了前缀
type SubDocExpect = "缺少必传的字段aaa_str、aaa_bool";

Checking<typeof SubDoc, SubDocExpect, Test.Pass>();
