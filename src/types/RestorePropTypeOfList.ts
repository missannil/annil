import { Checking, type Test } from "hry-types";
import type { SpecificType } from "./SpecificType";

export type ReStorePropTypeOfList<L, R extends unknown[] = []> = L extends [infer Head, ...infer Rest]
  ? ReStorePropTypeOfList<Rest, [...R, SpecificType<Head>]>
  : R;

type Test1 = ReStorePropTypeOfList<[number, string, { c: boolean }, boolean, string[]]>;

type Test1Expect = [
  SpecificType<number>,
  SpecificType<string>,
  SpecificType<{
    c: boolean;
  }>,
  SpecificType<boolean>,
  SpecificType<string[]>,
];

Checking<Test1, Test1Expect, Test.Pass>;
