import type { IfAllExtends } from "hry-types";
import type { ComponentDoc } from "../api/DefineComponent/returnType/ComponentDoc";
// import type { ComponentDoc } from "../api/DefineComponent/CreateDoc/ComponentDoc";

type _ReplacePrefix<O, TPrefix extends string> = {
  [k in keyof O as k extends `${string}_${infer L}` ? `${TPrefix}_${L}` : k]: O[k];
};

/**
 * 更改文档前缀
 * @param TComponentDoc - ComponentDoc
 * @returns ComponentDoc
 */
export type ReplacePrefix<TComponentDoc extends ComponentDoc, TPrefix extends string = ""> =
  & IfAllExtends<
    unknown,
    TComponentDoc["properties"],
    {},
    {
      properties: _ReplacePrefix<TComponentDoc["properties"], TPrefix>;
    }
  >
  & IfAllExtends<
    unknown,
    TComponentDoc["events"],
    {},
    { events: _ReplacePrefix<TComponentDoc["events"], TPrefix> }
  >;

// type Test1 = ReplacePrefix<{ properties: { xxx_name: string } }, "xxxDaa">;

// type Test1Expect = { properties: { xxxDaa_name: string } };

// typeEqual<Test1, Test1Expect>;

// type Test2 = ReplacePrefix<{ events: { xxx_name: string } }, "xxxDaa">;

// type Test2Expect = { events: { xxxDaa_name: string } };

// typeEqual<Test2, Test2Expect>;

// type Test3 = ReplacePrefix<{}, "xxxDaa">;

// type Test3Expect = {};

// typeEqual<Test3, Test3Expect>;
