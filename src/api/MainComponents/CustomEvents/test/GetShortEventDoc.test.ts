import { type Test, TypeChecking } from "hry-types";
import type { SpecificType } from "../../../../common_types/SpecificType";
import type { GetShortEventDoc } from "../GetShortEventDoc";

// ------------测试GetShortEventDoc泛型------------

type ShortEventList = [
  StringConstructor,
  null,
  SpecificType<"male" | "female">,
  [StringConstructor, SpecificType<0 | 1 | 2>],
  [StringConstructor, SpecificType<0 | 1 | 2>, null],
];

type test0 = GetShortEventDoc<ShortEventList[0]>;

TypeChecking<test0, string, Test.Pass>;

type test1 = GetShortEventDoc<ShortEventList[1]>;

TypeChecking<test1, null, Test.Pass>;

type test2 = GetShortEventDoc<ShortEventList[2]>;

TypeChecking<test2, "male" | "female", Test.Pass>;

type test3 = GetShortEventDoc<ShortEventList[3]>;

TypeChecking<test3, string | 0 | 1 | 2, Test.Pass>;

type test4 = GetShortEventDoc<ShortEventList[4]>;

TypeChecking<test4, string | 0 | 1 | 2 | null, Test.Pass>;
