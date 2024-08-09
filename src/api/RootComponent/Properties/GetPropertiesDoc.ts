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
  RequiredDoc extends object = GetRequiredDoc<Omit<TProperties, keyof OptionalDoc>>,
> = ComputeIntersection<OptionalDoc & RequiredDoc>;

/**
 * properties字段的文档类型
 * @remarks 必传的字段如果是object,要联合上null类型,选传的object根据是否是页面来决定是否加null
 */
export type GetPropertiesDoc<
  TProperties extends PropertiesConstraint,
  TisPage extends boolean,
> = _GetPropertiesDoc<TProperties, TisPage>;
