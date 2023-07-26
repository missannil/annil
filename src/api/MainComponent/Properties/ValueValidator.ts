import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { InferSpecificType } from "../../../types/InferSpecificType";

export type ValueValidator<T, TErrText = () => "⚠️类型错误⚠️"> = IfExtends<
  {},
  T,
  unknown,
  {
    [k in keyof T]: T[k] extends {
      type: infer R;
      value: infer V;
    } ? V extends InferSpecificType<R> ? unknown
      : { value: TErrText }
      : unknown;
  }
>;
