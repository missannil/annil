import { Checking, type Test } from "hry-types";
import type { GetShortCustomEventsDoc } from "../GetShortCustomEventsDoc";
import { mock_shorCustomEvents } from "./CustomEventConstraint.test";

// ------------测试GetShortEventDoc泛型------------

type StrResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["str"]>;

export type StrExpected = string;

Checking<StrResult, StrExpected, Test.Pass>;

type NullResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["null"]>;

export type NullExpected = null;

Checking<NullResult, NullExpected, Test.Pass>;

type UnionStrResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["unionStr"]>;

export type UnionStrExpected = "male" | "female";

Checking<UnionStrResult, UnionStrExpected, Test.Pass>;

type ListResult = GetShortCustomEventsDoc<typeof mock_shorCustomEvents["list"]>;

export type ListExpected = string | 0 | 1 | 2 | null;

Checking<ListResult, ListExpected, Test.Pass>;
