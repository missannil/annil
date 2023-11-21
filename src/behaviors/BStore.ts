import type { Func } from "hry-types/src/Misc/Func";
import type mobx from "mobx";
import { deepClone } from "../utils/deepClone";
import { deleteProtoField } from "../utils/deleteProtoField";
import type { InstanceInner } from "./BComputedAndWatch/types";

function applySetData(this: InstanceInner, callback?: Func) {
  const setDataObj = this.__pendingSetData__!;
  if (setDataObj === null) {
    console.warn("没有待setData的数据");

    return;
  }
  this.__pendingSetData__ = null;

  this.setData(setDataObj, callback);
}
/**
 * 响应式数据默认一起setData,避免observers.**多次触发去更新计算属性,从而提高性能。
 */
function scheduleSetData(this: InstanceInner, key: string, value: unknown) {
  const pendingSetData = this.__pendingSetData__;
  if (!pendingSetData) {
    this.__pendingSetData__ = {};

    wx.nextTick(this.applySetData);
  }
  this.__pendingSetData__![key] = value;
}
/**
 * 响应式数据逻辑添加在attached生命周期,这样子组件计算属性(初始化在响应式数据后)在初始化时就得到准确的数据避免在attach时由于父组件传递的响应式值还没初始化。
 */
export const BStore = Behavior({
  // definitionFilter(options: ComponentOptions) {
  // },

  lifetimes: {
    attached(this: InstanceInner) {
      // 取出通过addStoreConfigToMethods函数带入的storeConfig
      const storeConfig = this.__storeConfig__?.();
      if (!storeConfig) return;
      const { comparer, reaction, toJS } = require("mobx") as typeof mobx;
      const scheduleSetDataStore = {};
      for (const key in storeConfig) {
        scheduleSetDataStore[key] = deepClone(toJS(storeConfig[key]())), this.disposer ||= {};

        // 添加响应式逻辑
        this.disposer[key] = reaction(
          storeConfig[key],
          (value: unknown) => {
            // 加入到待setData对象中
            scheduleSetData.call(this, key, toJS(value));
          },
          {
            equals: comparer.structural,
          },
        );
      }
      // 初始化store
      this.setData(scheduleSetDataStore);

      deleteProtoField(this, "__storeConfig__");

      // 为this上加applySetData方法(响应式数据变化时,默认是在nexttick进行setData的,可通过applySetData方法实现同步setData)
      this.applySetData = applySetData.bind(this);
    },
    detached(this: InstanceInner) {
      // 清除store数据
      for (const key in this.disposer) {
        this.disposer[key]();
      }
    },
  },
});
