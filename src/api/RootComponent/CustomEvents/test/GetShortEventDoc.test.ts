/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../../utils/typeEqual";

import type { Mock_User } from "../../Properties/test/normalRequired.test";
import type { GetShortCustomEventsDef } from "../GetCustomEventDef";
import { type mock_shortCustomEvents } from "./normal.test";

type StrResult = GetShortCustomEventsDef<typeof mock_shortCustomEvents["str"]>;

export type StrExpected = string;

typeEqual<StrResult, StrExpected>;

type NullResult = GetShortCustomEventsDef<typeof mock_shortCustomEvents["null"]>;

export type NullExpected = null;

typeEqual<NullResult, NullExpected>;

type UnionStrResult = GetShortCustomEventsDef<typeof mock_shortCustomEvents["unionStr"]>;

export type UnionStrExpected = "male" | "female";

typeEqual<UnionStrResult, UnionStrExpected>;

type ListResult = GetShortCustomEventsDef<typeof mock_shortCustomEvents["union"]>;

export type ListExpected = string | 0 | 1 | 2 | null;

typeEqual<ListResult, ListExpected>;

type ObjResult = GetShortCustomEventsDef<typeof mock_shortCustomEvents["obj"]>;

export type ObjExpected = Mock_User;

typeEqual<ObjResult, ObjExpected>;
