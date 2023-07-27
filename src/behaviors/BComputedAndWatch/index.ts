import type { Func } from "hry-types/src/Misc/Func";
import type { ComponentOptions } from "../../api/DefineComponent";
import { isEmptyObject } from "../../utils/isEmptyObject";
import { deepProxy, unwrap } from "./data-tracer";
import { type ComputedDependence, initComputed } from "./initComputed";

import { deepClone } from "../../utils/deepClone";
import { deleteProtoField } from "../../utils/deleteProtoField";
import { isEqual } from "./isEqual";
import type { InstanceInner, WatchOldValue } from "./types";
/**
 * 实现
 * 1. 计算属性初始化在attached之后(前版本在beforeCreate)
 * 2. 通过observers.**(前版本劫持setData)更新计算属性。
 * 原因
 * 1. 之前版本放在beforeCreate好处是符合正常思维,即组件建立后(created)包含计算属性的data就应该都存在了。
 * 但由于properties字段数据实际有效是发生在attached之后。所以之前版本计算属性在挂载到上级组件时,依赖properties的计算属性更新有可能是无意义的。因为上级组件传递的properties有可能由它的上级组件传递而来。根本愿意是组件实例挂载是由内而外,而properties是由外到内传递数据。虽然这些无意义更新只发生在一次(onload之前).
 * 2 当properties中有内部字段时(例如设置了pureDataPattern: /^_/,),无法通过设置properties下的observer属性来获知属性更新通知,从而无法劫持setData。才导致有这个最新版本出现。
 * 3. 子组件计算属性若依赖properties字段,当子组件挂载到父组件时,就会触发observers.**字段,从而进行一次无效的计算属性更新。解决方案是：实例默认一个__computedStatus__字段,当observers.**变化时,如果__computedStatus__为'初始化中'(表示计算属性还未初始化完毕),就不会进行计算属性更新。当attached周期后(计算属性初始化完毕)把__computedStatus__变为'待更新',再次触发observers.**字段则更新计算属性。
 */
/**
 * computed初始化值在组件建立后,这样能保证计算属性依赖properties字段时,properties必传字段一定有值,减少计算属性代码(不必考虑properties无值时的情况)。坏处是增加了组件初始化时运行的代码量。
 */
function getPathsValue(this: InstanceInner, paths: string[]) {
  return paths.reduce((pre: unknown, path) => {
    // pre有可能为undefined,比如paths(['computedUser','name'])的首路径为还未初始化的计算属性,还有可能是properties的对象类型(默认为null)
    return pre ? pre[path] : pre;
  }, this.data);
}

function computedUpdater(this: InstanceInner, isUpdated = false): boolean {
  // console.log("computedUpdater开始");

  // console.log("循环判断缓存中每个计算属性依赖是否有变化");

  for (const key in this.__computedCache__) {
    // console.log("当前计算属性为:", key);

    const itemCache = this.__computedCache__[key];
    let changed = false;
    for (const dep of itemCache.dependences) {
      const curVal = getPathsValue.call(this, dep.paths);

      // 检查依赖是否更新
      if (!isEqual(curVal, dep.val)) {
        changed = true;

        break;
      }
    }

    if (changed) {
      const newDependences: ComputedDependence[] = [];

      const newValue = itemCache.method.call({
        data: deepProxy(this.data, newDependences),
      });

      // 更新值不会立即再次进入**函数,而是当前**函数运行完毕后触发**函数,
      this.setData({
        [key]: unwrap(newValue),
      });

      isUpdated = true;

      // 更新依赖
      this.__computedCache__[key].dependences = newDependences;

      // 有一个计算属性更新就重新更新所有计算互相,避免后置依赖导致前置依赖错误
      return computedUpdater.call(this, isUpdated);
    }
  }

  return isUpdated;
}
function initWatchOldValue(this: InstanceInner, watchConfig: object): WatchOldValue {
  const watchOldValue = {};
  for (const key in watchConfig) {
    watchOldValue[key] = deepClone(getPathsValue.call(this, key.split(".")));
  }

  return watchOldValue;
}
export const BComputedAndWatch = Behavior({
  definitionFilter(options: ComponentOptions) {
    const computedConfig = options.computed;
    // computed handle
    if (computedConfig && !isEmptyObject(computedConfig)) {
      const methodsConfig = options.methods ||= {};

      // 把计算属性配置保留在methods的__computedConfig__字段下带入到组件实例中。
      methodsConfig.__computedConfig__ = () => computedConfig;

      const observersConfig = options.observers ||= {};
      // 通过observers加入`**`字段来触发计算属性更新
      const originalFunc = observersConfig["**"] as Func | undefined;

      observersConfig["**"] = function(this: InstanceInner): undefined {
        const computedStatus = this.__computedStatus__;
        switch (computedStatus) {
          case undefined:
            // 1 触发来自attach时或没有计算属性时
            originalFunc && originalFunc.call(this);

            break;
          case "初始化中":
            // 2 触发来自计算属性初始化时的setData,什么都不需要做。 初始化后__computedStatus__变为待更新

            break;
          case "待更新":
            // 3. 触发来自attached后的setData或properties更新
            {
              const isUpdated = this.__computedUpdater__();
              if (isUpdated) {
                // 更新了会再次触发自身转到 4
                this.__computedStatus__ = "更新完毕";
              } else {
                // 无需更新计算属性
                originalFunc && originalFunc.call(this);
              }
            }
            break;
          case "更新完毕":
            {
              // 4 来自计算属性更新后的自身回调
              // console.log("来自计算属性更新后的自身回调");
              this.__computedStatus__ = "待更新";

              originalFunc && originalFunc.call(this);
            }
            break;
        }
      };
    }
    // watch handle
    const watchConfig = options.watch;
    if (watchConfig && !isEmptyObject(watchConfig)) {
      const methodsConfig = options.methods ||= {};

      // 把watch配置保留在methods的__watchConfig__字段下带入到组件实例中。
      methodsConfig.__watchConfig__ = () => watchConfig;

      const observersConfig = options.observers ||= {};
      for (const key in watchConfig) {
        const watchHadle = watchConfig[key];

        observersConfig[key] = function(this: InstanceInner, newValue: unknown) {
          const watchOldValue = this.__watchOldValue__!;
          const oldValue = watchOldValue[key];

          if (oldValue === undefined) {
            // oldValue为undefined时,表示key为计算属性关联的路径,触发是因为计算属性初始化导致。所以当前newValue为计算属性初始值。properties字段对象类型oldvalue为null
            watchOldValue[key] = deepClone(newValue);

            // 这里返回表示不监控计算属性初始化时的赋值
            return;
          }
          if (isEqual(newValue, oldValue)) return;
          watchOldValue[key] = deepClone(newValue);

          watchHadle.call(this, newValue, oldValue);
        };
      }
    }
  },
  lifetimes: {
    created(this: InstanceInner) {
      // 初始化watch 生成OldValue
      const watchConfig = this.__watchConfig__?.();

      deleteProtoField(this, "__watchConfig__");

      if (watchConfig) {
        // 1 此时由于计算属性还未初始化所以计算属性的oldValue为undefined,后续 2
        this.__watchOldValue__ = initWatchOldValue.call(this, watchConfig);
      }
    },
    attached(this: InstanceInner) {
      const computedConfig = this.__computedConfig__?.();

      deleteProtoField(this, "__computedConfig__");

      // 处理 computed
      if (computedConfig) {
        // 实例加入 __computedUpdateStatus__ 提高性能
        this.__computedStatus__ = "初始化中";

        // 初始化计算属性(返回缓存)
        this.__computedCache__ = initComputed.call(
          this,
          computedConfig,
          Object.keys(computedConfig),
        );

        // 给原型上加入__computedUpdater__方法 在observers下的'**'配置中触发

        this.__computedUpdater__ = computedUpdater.bind(this);

        this.__computedStatus__ = "待更新";

        // // 2 为watchOldValue加入计算属性的初始值
        // const watchOldValue = this.__watchOldValue__;
        // if (!watchOldValue) return;
        // const computedCache = this.__computedCache__;
        // for (const key in computedCache) {
        //   if (Object.prototype.hasOwnProperty.call(watchOldValue, key)) {
        //     watchOldValue[key] = computedCache[key].value;
        //   }
        // }
      }
    },
  },
});
