import type { Func } from "hry-types/src/Misc/Func";
import { deepClone, deepEqual, isEmptyObject, nonNullable } from "../../../../utils/_utils";
import type { Instance } from "../../../RootComponent/Instance/RootComponentInstance";
import type { FinalOptionsOfComponent, WatchOldValue } from "..";
import { getPathsValue } from "./getPathsValue";
import { getPropertiesValue } from "./getPropertiesValue";
import { hasComputedPath } from "./hasComputedPath";

// 初始化watch监控字段的旧值对象,排除有计算属性的字段。
function initWatchOldValuesWithoutComputed(
  data: FinalOptionsOfComponent["data"],
  watchConfig: object,
  computedKeys: string[],
): WatchOldValue {
  const watchOldValue: WatchOldValue = {};
  for (const path in watchConfig) {
    // 有计算属性的路径,跳过会在计算属性初始化后赋值
    if (hasComputedPath(path, computedKeys)) continue;
    watchOldValue[path] = deepClone(getPathsValue(data, path));
  }

  return watchOldValue;
}
function observerHandler(
  this: Instance,
  key: string,
  originObserversHandle: Func | undefined,
  watchHadle: Func,
  ...newValue: unknown[]
) {
  // 先调用原生observers的回调函数,再调用watch的回调函数。因为watch的回调函数可能会用到原生observers回调函数中更新的数据。
  originObserversHandle?.call(this, ...newValue);
  const watchOldValue = nonNullable(this.data.__watchOldValue__);
  const oldValue = watchOldValue[key];
  if (deepEqual(newValue, oldValue)) return;
  watchOldValue[key] = deepClone(newValue);
  watchHadle.call(this, ...newValue, ...oldValue);
}

/**
 * 把watch配置转换成observers配置的形式,并在回调函数中调用watch的回调函数。
 * 小程序的observers是通过监控setData字段,来触发的,不会比较值的变化,小程序底层代码可以监控到properties变化时的setData动作.
 * watch字段的目的是数据变化时才触发回调函数,但由于实例中无法通过setData的调用来监听到properties字段变化,所以watch字段的实现方式是通过在observers回调函数中比较新旧值来实现的。
 * 还要在组件实例上维护一个__watchOldValue__对象来存储watch监控字段的旧值，以便在回调函数中进行比较。
 * @param finalOptionsForComponent
 */
export function handleWatchConfig(
  finalOptionsForComponent: FinalOptionsOfComponent,
) {
  const { observers: observersConfig, watch: watchConfig, data, properties, computed: computedConfig } =
    finalOptionsForComponent;
  if (!isEmptyObject(watchConfig)) {
    const rawPropertiesValue = getPropertiesValue(properties);
    const computedKeys = Object.keys(computedConfig);

    data.__watchOldValue__ = initWatchOldValuesWithoutComputed(
      { ...data, ...rawPropertiesValue },
      watchConfig,
      computedKeys,
    );
    for (const key in watchConfig) {
      const watchHadle = watchConfig[key];
      const originObserversHandle = observersConfig[key] as Func | undefined;
      // 在监控多个数据时,参数是多个值
      observersConfig[key] = function(this: Instance, ...values: unknown[]) {
        // 计算属性初始化完成时直接调用。
        if (this.data.__computedInited__) {
          observerHandler.call(this, key, originObserversHandle, watchHadle, ...values);
        } else {
          // 计算属性未初始化完成时,先把watch的回调函数注册到实例上,等计算属性初始化完成时再调用。因为计算属性初始化完成时会把data中的值setData一次,会触发observers回调函数,所以在这里注册watch的回调函数,就能保证计算属性初始化完成后能正确调用watch的回调函数。
          (this.data.__oberverHandler__ ||= []).push(
            observerHandler.bind(this, key, originObserversHandle, watchHadle, ...values),
          );
        }
      };
    }
  }
}
