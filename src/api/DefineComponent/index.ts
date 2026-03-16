import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { CustomComponentTrueOptions } from "../CustomComponent";
import type { CustomComponentDefinition } from "../CustomComponent/CustomComponentDefinition";
import type { RootComponentTrueOptions } from "../RootComponent";
import type { RootComponentDefinition } from "../RootComponent/RootComponentDefinition";
import type { NameOrPathOption } from "./NameOrPage/NameOrPathOption";
import { normalizeOptions } from "./normalizeOptions";
import type { GenerateComponentDoc } from "./ReturnType/GenerateComponentDoc";
import type { GeneratePageDoc } from "./ReturnType/GeneratePageDoc";
import type { RootComponentOption } from "./RootComponent/RootComponentOption";
import type { SubComponentsOption } from "./SubComponents/SubComponentsOption";
export type Path = `/${string}`;

type Options<
  TRootComponentDefinition extends RootComponentDefinition,
  TCustomComponentDefinitionList extends CustomComponentDefinition[],
  TName extends string,
  TPath extends Path,
> =
  & NameOrPathOption<TName, TPath, NonNullable<TRootComponentDefinition["isPage"]>>
  & RootComponentOption<TRootComponentDefinition>
  & SubComponentsOption<TCustomComponentDefinitionList>;
/**
 * 根据是否传入name字段来区分生成页面文档还是组件文档。
 */
type generateDoc<
  TRootComponentDefinition extends RootComponentDefinition,
  TCustomComponentDefinitionList extends CustomComponentDefinition[],
  TName extends string,
  TPath extends Path,
> = IfExtends<
  "",
  TName,
  GeneratePageDoc<TRootComponentDefinition, TPath>,
  GenerateComponentDoc<TRootComponentDefinition, TName, TCustomComponentDefinitionList>
>;
type DefineComponentConstructor = <
  TRootComponentDefinition extends RootComponentDefinition = {},
  TCustomComponentDefinitionList extends CustomComponentDefinition[] = [],
  TName extends string = "",
  TPath extends Path = "/",
>(
  options: Options<TRootComponentDefinition, TCustomComponentDefinitionList, TName, TPath>,
) => generateDoc<TRootComponentDefinition, TCustomComponentDefinitionList, TName, TPath>;

export type DefineComponentOptionEquivalent = {
  name?: string;
  path?: string;
  rootComponent?: RootComponentTrueOptions;
  subComponents?: CustomComponentTrueOptions[];
};

/**
 * DefineComponent是构建组件的核心API之一,在annil架构中,所有组件(页面组件和自定义组件)都通过它来构建的。
 * 它返回的类型可能是页面文档(`PageDoc`)或者组件文档(`ComponentDoc`),具体取决于传入的选项中是否包含`name`字段。
 * 它的作用是把根组件定义(`RootComponentDefinition`)和子组件定义(`CustomComponentDefinition`和`ChunkComponentDefinition`)整合成原生`Component`的选项配置,最终通过原生`Component`来构建组件。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- DefineComponent的返回类型由DefineComponentConstructor定义,实现无需。
export const DefineComponent: DefineComponentConstructor = function(options): any {
  Component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- normalizeOptions返回类型中properties字段类型与WechatMiniprogram.Component.Constructor中的properties字段类型不兼容,但运行时是兼容的,所以这里使用any断言。
    normalizeOptions(options as DefineComponentOptionEquivalent) as any,
  );
};
