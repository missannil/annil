import { Checking, type Test } from "hry-types";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComponentDoc } from "./ComponentDoc";

type _ReplacePrefix<O extends object, TPrefix extends string> = {
  [k in keyof O as k extends `${string}_${infer L}` ? `${TPrefix}_${L}` : k]: O[k];
};

/**
 * 更改文档前缀
 * @param TComponentDoc ComponentDoc
 * @returns ComponentDoc
 */
export type ReplacePrefix<TComponentDoc extends ComponentDoc, TPrefix extends string = ""> =
  & IfExtends<
    unknown,
    TComponentDoc["properties"],
    {},
    {
      properties: _ReplacePrefix<TComponentDoc["properties"] & {}, TPrefix>;
    }
  >
  & IfExtends<
    unknown,
    TComponentDoc["customEvents"],
    {},
    { customEvents: _ReplacePrefix<TComponentDoc["customEvents"] & {}, TPrefix> }
  >;

type Test1 = ReplacePrefix<{ properties: { xxx_name: string } }, "xxxDaa">;

type Test1Expect = { properties: { xxxDaa_name: string } };

Checking<Test1, Test1Expect, Test.Pass>;

type Test2 = ReplacePrefix<{ customEvents: { xxx_name: string } }, "xxxDaa">;

type Test2Expect = { customEvents: { xxxDaa_name: string } };

Checking<Test2, Test2Expect, Test.Pass>;
