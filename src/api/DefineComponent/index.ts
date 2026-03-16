import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { CustomComponentTrueOptions } from "../CustomComponent";
import type { CustomComponentReturnType } from "../CustomComponent/CustomComponentType";
import type { RootComponentTrueOptions } from "../RootComponent";
import type { RootComponentReturnType } from "../RootComponent/returnType";
import type { NameOrPathOption } from "./NameOrPage/NameOrPathOption";
import { normalizeOptions } from "./normalizeOptions";
import type { CreateComponentDoc } from "./ReturnType/CreateComponentDoc";
import type { CreatePageDoc } from "./ReturnType/CreatePageDoc";
import type { RootComponentOption } from "./RootComponent/RootComponentOption";
import type { SubComponentsOption } from "./SubComponents/SubComponentsOption";
export type Path = `/${string}`;

type Options<
  TRootComponentReturnType extends RootComponentReturnType,
  TCustomComponentReturnTypeList extends CustomComponentReturnType[],
  TName extends string,
  TPath extends Path,
> =
  & NameOrPathOption<TName, TPath, NonNullable<TRootComponentReturnType["isPage"]>>
  & RootComponentOption<TRootComponentReturnType>
  & SubComponentsOption<TCustomComponentReturnTypeList>;

/**
 * DefineComponentConstructorReturnType根据是否传入name字段来区分生成页面文档还是组件文档。
 */
type DefineComponentConstructorReturnType<
  TRootComponentReturnType extends RootComponentReturnType,
  TCustomComponentReturnTypeList extends CustomComponentReturnType[],
  TName extends string,
  TPath extends Path,
> = IfExtends<
  "",
  TName,
  // 生成页面文档
  CreatePageDoc<TRootComponentReturnType, TPath>,
  // 生成组件文档
  CreateComponentDoc<TRootComponentReturnType, TName, TCustomComponentReturnTypeList>
>;
type DefineComponentConstructor = <
  TRootComponentReturnType extends RootComponentReturnType = {},
  TCustomComponentReturnTypeList extends CustomComponentReturnType[] = [],
  TName extends string = "",
  TPath extends Path = "/",
>(
  options: Options<TRootComponentReturnType, TCustomComponentReturnTypeList, TName, TPath>,
) => DefineComponentConstructorReturnType<TRootComponentReturnType, TCustomComponentReturnTypeList, TName, TPath>;

export type DefineComponentOptionEquivalent = {
  name?: string;
  path?: string;
  rootComponent?: RootComponentTrueOptions;
  subComponents?: CustomComponentTrueOptions[];
};

/**
 * DefineComponent是构建组件的核心API,在annil架构中,所有组件(页面组件和自定义组件)都通过它来构建的。
 * 它的作用是把`RootComponent`和`CustomComponent`中的选项配置整合成原生`Component`的选项配置,最终通过原生`Component`来构建组件。可以把DefineComponent理解成`Component`的增强版或语法糖,它提供了更强的类型推导和具象化的组件构建思维(组件是由根组件和子组件组成的)。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- DefineComponent的返回类型由DefineComponentConstructor定义,实现无需。
export const DefineComponent: DefineComponentConstructor = function(options): any {
  Component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- normalizeOptions返回类型中properties字段类型与WechatMiniprogram.Component.Constructor中的properties字段类型不兼容,但运行时是兼容的,所以这里使用any断言。
    normalizeOptions(options as DefineComponentOptionEquivalent) as any,
  );
};
