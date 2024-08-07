// import { Checking, type Test } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentType } from "../api/DefineComponent/ReturnType/ComponentType";

/**
 * 提取文档前缀名
 */
export type GetComponentPrefix<TComponentDoc extends ComponentType> = EmptyObject extends TComponentDoc ? never
  : keyof IfExtends<
    unknown,
    TComponentDoc["properties"],
    TComponentDoc["customEvents"],
    TComponentDoc["properties"]
  > extends `${infer P}_${string}` ? P
  : never;

// type Test1 = GetComponentPrefix<{ properties: { xxx_name: string } }>;

// type Test1Expect = "xxx";

// Checking<Test1, Test1Expect, Test.Pass>;

// type Test2 = GetComponentPrefix<{ customEvents: { xxx_name: string } }>;

// type Test2Expect = "xxx";

// Checking<Test2, Test2Expect, Test.Pass>;

// type demo = never extends `${infer P}_${string}` ? P : ""; // => string why?

// type Test3 = GetComponentPrefix<{}>;

// type Test3Expect = never;

// Checking<Test3, Test3Expect, Test.Pass>;
