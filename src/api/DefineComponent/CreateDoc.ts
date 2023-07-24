import type { IfExtends } from "hry-types/src/Any/IfExtends";
import type { ComputeIntersection } from "hry-types/src/Object/ComputeIntersection";
import type { Has } from "hry-types/src/Tuple/_api";
import type { MainComponentDoc } from "../../types/MainComponentDoc";
import type { SubComponentDoc } from "../../types/SubComponentDoc";
import type { AddPrefixAndNull } from "./AddPrefixAndNull";
// import type { GetSubCustomEventDoc } from "./GetSubCustomEventDoc";
import type { GetSubCustomEventDoc } from "./GetSubCustomEventDoc";
import type { GetSubPropertiesDoc } from "./GetSubPropertiesDoc";

// type HasProperties<TSubComponentDoc extends SubComponentDoc> = true extends
//   (TSubComponentDoc extends { properties: any } ? false : true) ? true : false;

/**
 * 创建组件文档
 * @returns  ComponentDoc or  PageDoc
 */
export type CreateDoc<
  TMainComponent extends MainComponentDoc = {},
  TSubComponentTuple extends SubComponentDoc[] = [],
  TName extends string = "",
  TPage extends `/${string}` = "/",
  // 判断是否有properties字段 为了减少实例化次数
  SubComponentHasProperties = Has<TSubComponentTuple, { properties: any }>,
  // 判断是否有customEvents字段 为了减少实例化次数
  SubComponentHasCustomEvents = Has<TSubComponentTuple, { customEvents: any }>,
> = ComputeIntersection<
  // 页面时保留path字段
  & (TName extends "" ? { path: TPage } : unknown)
  // 生成properties字段
  & IfExtends<
    SubComponentHasProperties,
    true,
    // 子组件有properties
    IfExtends<
      unknown,
      TMainComponent["properties"],
      // 主组件无properties
      {
        properties: AddPrefixAndNull<GetSubPropertiesDoc<TSubComponentTuple>, TName>;
      },
      // 主组件也有properties
      {
        properties: AddPrefixAndNull<GetSubPropertiesDoc<TSubComponentTuple> & TMainComponent["properties"], TName>;
      }
    >,
    // 子组件无properties
    IfExtends<
      unknown,
      TMainComponent["properties"],
      // 主组件也无properties
      unknown,
      // 主组件有properties
      {
        properties: AddPrefixAndNull<TMainComponent["properties"], TName>;
      }
    >
  >
  // 生成customEvents字段
  & IfExtends<
    SubComponentHasCustomEvents,
    true,
    // 子组件有customEvents
    IfExtends<
      unknown,
      TMainComponent["customEvents"],
      // 主组件无customEvents
      {
        customEvents: GetSubCustomEventDoc<TSubComponentTuple>;
      },
      // 主组件也有customEvents
      {
        customEvents: GetSubCustomEventDoc<TSubComponentTuple> & TMainComponent["customEvents"];
      }
    >,
    // 子组件无customEvents
    IfExtends<
      unknown,
      TMainComponent["customEvents"],
      // 主组件也无customEvents
      unknown,
      // 主组件有customEvents
      {
        customEvents: TMainComponent["customEvents"];
      }
    >
  >
>;
