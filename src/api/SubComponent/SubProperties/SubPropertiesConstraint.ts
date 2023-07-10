import type { IfEquals } from "hry-types/src/Any/IfEquals";
import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { EmptyObject } from "hry-types/src/Misc/EmptyObject";
import type { ComponentDoc } from "../../../common_types/ComponentDoc";
import type { RestorePropertiesDoc } from "../../../common_types/RestorePropertiesDoc";
import type { PropertiesConstraint } from "../../MainComponent/Properties/PropertiesConstraint";

/**
 * @description properties字段约束
 * @returns1
 * TComponentDoc为{}时 返回 PropertiesConstraint<Literal>,
 * @returns2
 * TComponentDoc["properties"]为unknown时 返回 {}
 * @returns3
 * TComponentDoc["properties"]不为unknown 返回 RestorePropertiesDoc<TComponentDoc["properties"] & {}>
 */
export type SubPropertiesConstraint<TComponentDoc extends ComponentDoc, Literal> = IfEquals<
  {},
  TComponentDoc,
  PropertiesConstraint<Literal>,
  IfExtends<unknown, TComponentDoc["properties"], EmptyObject, RestorePropertiesDoc<TComponentDoc["properties"] & {}>>
>;
