// import { typeEqual, type Test } from "hry-types";
import type { EmptyObject, IfAllExtends } from "hry-types";
import type { ComponentDoc } from "../api/DefineComponent/returnType/ComponentDoc";

/**
 * 提取文档前缀名
 */
export type GetComponentPrefix<TComponentDoc extends ComponentDoc> = EmptyObject extends TComponentDoc ? never
  : keyof IfAllExtends<
    unknown,
    TComponentDoc["properties"],
    TComponentDoc["events"],
    TComponentDoc["properties"]
  > extends `${infer P}_${string}` ? P
  : never;

// type Test1 = GetComponentPrefix<{ properties: { xxx_name: string } }>;

// type Test1Expect = "xxx";

// typeEqual<Test1, Test1Expect>;

// type Test2 = GetComponentPrefix<{ events: { xxx_name: string } }>;

// type Test2Expect = "xxx";

// typeEqual<Test2, Test2Expect>;

// type demo = never extends `${infer P}_${string}` ? P : ""; // => string why?

// type Test3 = GetComponentPrefix<{}>;

// type Test3Expect = never;

// typeEqual<Test3, Test3Expect>;
