import type { Select } from "hry-types/src/Object/Select";

import type { ComputeIntersection } from "hry-types/src/Object/_api";
import type { GetOptionalDoc } from "./GetOptionalDoc";
import type { GetRequiredDoc } from "./GetRequiredDoc";
import type { OptionalType, PropertiesConstraint } from "./PropertiesConstraint";

type _GetPropertiesDoc<
  TProperties extends PropertiesConstraint,
  TIsPage extends boolean,
  // @ts-ignore
  OptionalDoc extends object = GetOptionalDoc<Select<TProperties, OptionalType>, TIsPage>,
  // @ts-ignore
  RequiredDoc extends object = GetRequiredDoc<Omit<TProperties, keyof OptionalDoc>, TIsPage>,
> = ComputeIntersection<OptionalDoc & RequiredDoc>;

/**
 * properties字段的文档类型
 */
export type GetPropertiesDoc<
  TProperties extends PropertiesConstraint,
  TisPage extends boolean,
> = _GetPropertiesDoc<TProperties, TisPage>;
