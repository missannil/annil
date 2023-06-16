// ----------------GetDataDoc test----------------
import { TypeChecking } from "hry-types";

import type { GetDataDoc } from "../../../../src/types/data/GetDataDoc";

type data = { a: () => number; b: number; c: string };

TypeChecking<GetDataDoc<data, "函数值类型变为函数返回类型">, { a: number; b: number; c: string }, true>;

TypeChecking<GetDataDoc<data, "去掉函数字段">, { b: number; c: string }, true>;

TypeChecking<GetDataDoc<data, "返回函数字段">, { a: () => number }, true>;
