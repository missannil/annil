import type { EmptyObject } from "hry-types";
import type { InferDetailedType } from "../../../types/InferDetailedType";
import type { NonReadonly } from "../../../types/NonReadonly";

/**
 * 验证properties的value类型是否正确
 * @returns unknown | `{ value: () => "⚠️类型错误⚠️" }`
 */
export type PropertiesValueValidator<
  TProperties,
  Result = {
    [
      k in keyof TProperties as TProperties[k] extends {
        type: infer R;
        value: infer V;
      } ? NonReadonly<V> extends NonReadonly<InferDetailedType<R>> ? never
        : k
        : never
    ]: { value: () => "⚠️类型错误⚠️" };
  },
> = EmptyObject extends Result ? unknown : Result;
