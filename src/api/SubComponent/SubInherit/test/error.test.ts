import { Checking, type Test } from "hry-types";
import { DefineComponent } from "../../../DefineComponent";
import type { ComponentDoc } from "../../../DefineComponent/ReturnType/ComponentDoc";
import type { RootComponentDoc } from "../../../RootComponent/RootComponentDoc";
import { SubComponent } from "../..";
import type { SubComponentDoc } from "../../SubComponentDoc";

type Mock_RootDoc = RootComponentDoc<{
  properties: {
    required_num: number;
    optional_literal_num?: 123 | 456 | 789;
    unionStrNum: string | number;
    required_obj: object | null;
    optional_obj?: object;
  };
  data: {
    str: string;
    literal_str: "a" | "b" | "c";
    bool: boolean;
  };
  computed: {
    Cuinon: string | boolean;
  };
}>;

type Mock_CompDoc = ComponentDoc<{
  properties: {
    aaa_num: number;
    aaa_literal_num: 123 | 456;
    aaa_str?: string;
    aaa_union: string | boolean;
    aaa_obj: object | null;
    aaa_obj1?: object | null;
  };
}>;

// RootDoc不为空时,可继承对应类型的字段。
SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  inherit: {
    // @ts-expect-error  [string | number] 不是 [number] 的子集
    aaa_num: "unionStrNum",
    // @ts-expect-error  [123 | 456 | 789] 不是 [123 | 456] 的子集
    aaa_literal_num: "optional_literal_num",
    // @ts-expect-error  [string | number] 不是 [string] 的子集
    aaa_str: "" as "unionStrNum",
  },
});

// inherit字段最终不会在组件配置中,意义在于通过声明继承字段便于类型判断,配置是否满足组件的需求。下面示例中,配置不满足组件需求,Mock_CompDoc需要一些必传字段没有配置,即使这些字段存在在于根组件(或wmxl).而返回的字符串(错误),无法通过DefinedComponent Api 类型检测。
const subDoc = SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  data: {
    aaa_num: 123,
  },
});

Checking<typeof subDoc, SubComponentDoc, Test.Fail>;

DefineComponent({
  name: "xxx",
  // @ts-expect-error 不能将类型“string”分配给类型“_SubComponentDoc”。
  subComponents: [subDoc],
});
