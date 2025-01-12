import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "./mock";
/**
 * 1. 为什么设计superDatas字段
 * 在wxml的solt组件中可能直接使用到RootComponent(RootDoc)和SubComponent(SubDoc)中的数据
 * vscode插件(annil)验证slot(wxml)中的数据时,应该与对应的ts文件中的SoltComponent中的数据(包括 data、store、computed、superDatas)对比.
 * superDatas字段中定义了slot组件依赖的数据,这样插件可以比对wxml中Slot块中的数据是否在superDatas中
 */

// 1 superDatas 字段中可以定义Mock_RootDoc中的数据,表示这个slot组件依赖的数据,插件可以比对wxml中Slot块中的数据是否在superDatas中
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  superDatas: ["required_num", "optional_literal_num"],
});
// 1 superDatas 字段中可以定义Mock_RootDoc中的数据,表示这个slot组件依赖的数据
SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  superDatas: ["aaa_num", "aaa_str"],
});
