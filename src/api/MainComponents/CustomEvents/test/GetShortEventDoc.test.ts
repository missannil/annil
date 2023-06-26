import { type Test, TypeChecking } from "hry-types";
import type { GetShortCustomEventsDoc } from "../GetShortCustomEventsDoc";
import { mock_shorCustomEvents } from "./CustomEventConstraint.test";

// ------------测试GetShortEventDoc泛型------------

type StrResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["str"]>;

export type StrExpected = string;

TypeChecking<StrResult, StrExpected, Test.Pass>;

type NullResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["null"]>;

export type NullExpected = null;

TypeChecking<NullResult, NullExpected, Test.Pass>;

type UnionStrResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["unionStr"]>;

export type UnionStrExpected = "male" | "female";

TypeChecking<UnionStrResult, UnionStrExpected, Test.Pass>;

type ListResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["list"]>;

export type ListExpected = string | 0 | 1 | 2 | null;

TypeChecking<ListResult, ListExpected, Test.Pass>;
