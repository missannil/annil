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
    _num: number;
    _str: string;
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

// 1 继承字段类型错误
SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  inherit: {
    // @ts-expect-error 1.1 [string | number] 不是 [number] 的子集
    aaa_num: "unionStrNum",
    // @ts-expect-error 1.2 [123 | 456 | 789] 不是 [123 | 456] 的子集
    aaa_literal_num: "optional_literal_num",
    // @ts-expect-error 1.3 不可继承内部字段
    aaa_str: "_str",
  },
});

// 2 inherit字段最终不会在组件配置中,意义在于通过声明继承字段便于类型判断,配置是否满足子组件文档的需求。下面示例中,配置不满足组件需求,Mock_CompDoc需要一些必传字段没有配置,即使这些字段存在在于根组件(或wmxl).而返回的字符串(错误),无法通过DefinedComponent Api 类型检测。
const subDoc = SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  data: {
    aaa_num: 123,
  },
});

void Checking<typeof subDoc, SubComponentDoc, Test.Fail>;

DefineComponent({
  name: "xxx",
  // @ts-expect-error 2 不能将类型“string”分配给类型“_SubComponentDoc”。
  subComponents: [subDoc],
});

// 3 错误的key检查

SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  inherit: {
    aaa_num: "required_num",
    // @ts-expect-error 3.1 不存在于组件中的key给错误提示
    xxx: "",
    // @ts-expect-error 3.2 不存在于组件中的key给错误提示
    aaa_xxx: "",
  },
});
// 4 数组时类型错误

SubComponent<Mock_RootDoc, Mock_CompDoc>()({
  inherit: {
    // @ts-expect-error   取消了数组类型,之前的版本允许数组类型表示三元表达式
    aaa_num: ["optional_lit1eral_num", "require1d_num"],
  },
});
