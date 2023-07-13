import { type Test, TypeChecking } from "hry-types";
import type { AddPrefixAndNull } from "../AddPrefixAndNull";

//
type Obj1 = { a: string; b: number; c: boolean };

type Test1Result = AddPrefixAndNull<Obj1, "test1">;

type Test1Expect = {
  test1_a: string;
  test1_b: number;
  test1_c: boolean;
};

TypeChecking<Test1Result, Test1Expect, Test.Pass>;

type Obj2 = { obj: { a: number }; obj1: { b?: number }; c: boolean; d: string[] };

type Test2Result = AddPrefixAndNull<Obj2, "test2">;

type Test2Expect = {
  test2_obj: {
    a: number;
  } | null;
  test2_obj1: {
    b?: number;
  } | null;
  test2_c: boolean;
  test2_d: string[];
};

TypeChecking<Test2Result, Test2Expect, Test.Pass>;

type ddd = string
