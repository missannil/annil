import { Checking, type Test } from "hry-types";

import type { ReadonlyDeep } from "hry-types/src/Any/ReadonlyDeep";
import type { Mock_User } from "../../Properties/test/normalRequired.test";
import type { GetShortCustomEventsDoc } from "../GetCustomEventDoc";
import { mock_shortCustomEvents } from "./normal.test";

type StrResult = GetShortCustomEventsDoc<typeof mock_shortCustomEvents["str"]>;

export type StrExpected = string;

Checking<StrResult, StrExpected, Test.Pass>;

type NullResult = GetShortCustomEventsDoc<typeof mock_shortCustomEvents["null"]>;

export type NullExpected = null;

Checking<NullResult, NullExpected, Test.Pass>;

type UnionStrResult = GetShortCustomEventsDoc<typeof mock_shortCustomEvents["unionStr"]>;

export type UnionStrExpected = "male" | "female";

Checking<UnionStrResult, UnionStrExpected, Test.Pass>;

type ListResult = GetShortCustomEventsDoc<typeof mock_shortCustomEvents["union"]>;

export type ListExpected = string | 0 | 1 | 2 | null;

Checking<ListResult, ListExpected, Test.Pass>;

type ObjResult = GetShortCustomEventsDoc<typeof mock_shortCustomEvents["obj"]>;

export type ObjExpected = ReadonlyDeep<Mock_User>;

Checking<ObjResult, ObjExpected, Test.Pass>;
