import { typeEqual } from "../utils/typeEqual";

import type { DetailedType } from "./DetailedType";
import type { InferDetailedType } from "./InferDetailedType";

typeEqual<InferDetailedType<StringConstructor>, string>();

typeEqual<InferDetailedType<NumberConstructor>, number>();
typeEqual<InferDetailedType<BooleanConstructor>, boolean>();
typeEqual<InferDetailedType<ArrayConstructor>, unknown[]>();
typeEqual<InferDetailedType<ObjectConstructor>, object>();
typeEqual<InferDetailedType<DetailedType<"a" | "b">>, "a" | "b">();
typeEqual<InferDetailedType<DetailedType<[string, number, boolean]>>, [string, number, boolean]>();
