import { Checking, type Test } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComponentDoc } from "./ComponentDoc";

/**
 * 提取文档前缀名
 * @param TComponentDoc - ComponentDoc
 */
export type ExtractDocPrefix<TComponentDoc extends ComponentDoc> = keyof IfExtends<
  unknown,
  TComponentDoc["properties"],
  TComponentDoc["customEvents"],
  TComponentDoc["properties"]
> extends `${infer P}_${string}` ? P
  : "";

type Test1 = ExtractDocPrefix<{ properties: { xxx_name: string } }>;

type Test1Expect = "xxx";

Checking<Test1, Test1Expect, Test.Pass>;

type Test2 = ExtractDocPrefix<{ customEvents: { xxx_name: string } }>;

type Test2Expect = "xxx";

Checking<Test2, Test2Expect, Test.Pass>;

type Test3 = ExtractDocPrefix<{}>;

type Test3Expect = string;

Checking<Test3, Test3Expect, Test.Pass>;
