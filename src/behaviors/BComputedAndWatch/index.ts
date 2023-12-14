import type { Func } from "hry-types/src/Misc/_api";
import type { FinalOptionsOfComponent } from "../../api/DefineComponent/collectOptionsForComponent";
import { deepClone } from "../../utils/deepClone";
import { deleteProtoField } from "../../utils/deleteProtoField";
import { isEmptyObject } from "../../utils/isEmptyObject";
import { computedUpdater } from "./computedUpdater";
import { getPathsValue } from "./getPathsValue";
import { getPropertiesValue } from "./getPropertiesValue";
import { initComputed } from "./initComputed";
import { isEqual } from "./isEqual";
import type { Instance, WatchOldValue } from "./types";
function initWatchOldValue(this: Instance, watchConfig: object): WatchOldValue {
  const watchOldValue = {};
  for (const key in watchConfig) {
    watchOldValue[key] = deepClone(getPathsValue(this.data, key));
  }

  return watchOldValue;
}

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

export const BComputedAndWatch = Behavior({
  // @ts-ignore
  definitionFilter(options: FinalOptionsOfComponent) {
    // 计算属性初始化
    const rawPropertiesValue = getPropertiesValue(options.properties);
    const methodOpt = options.methods;
    const computedConfig = options.computed;

    if (computedConfig && !isEmptyObject(computedConfig)) {
      const computedCache = initComputed(options, computedConfig, { ...options.data, ...rawPropertiesValue });

      // 把计算属性缓存从方法中带入到实例中,在created周期加入实例后删除
      methodOpt.__computedInitCache__ = () => computedCache;
    }
    const observersConfig = options.observers;
    // 通过observers加入`**`字段来触发计算属性更新
    const originalFunc = observersConfig["**"] as Func | undefined;

    observersConfig["**"] = function(this: Instance): undefined {
      const computedStatus = this.__computedStatus__;
      switch (computedStatus) {
        case "待更新":
          // 3. 触发来自attached后的setData或properties更新
          {
            const isUpdated = this.__computedUpdater__();
            if (isUpdated) {
              // 更新了会再次触发自身转到 4
              this.__computedStatus__ = "更新完毕";
            } else {
              // 无需更新计算属性
              originalFunc && /* istanbul ignore next */ originalFunc.call(this);
            }
          }
          break;
        case "更新完毕":
          {
            // 4 来自计算属性更新后的自身回调
            // console.log("来自计算属性更新后的自身回调");
            this.__computedStatus__ = "待更新";

            originalFunc && /* istanbul ignore next */ originalFunc.call(this);
          }
          break;
      }
    };

    // watch handle
    const watchConfig = options.watch;
    if (watchConfig && !isEmptyObject(watchConfig)) {
      /* istanbul ignore next */
      const methodsConfig = options.methods ||= {};

      // 把watch配置保留在methods的__watchConfig__字段下带入到组件实例中。
      methodsConfig.__watchConfig__ = () => watchConfig;

      /* istanbul ignore next */
      const observersConfig = options.observers ||= {};
      for (const key in watchConfig) {
        const watchHadle = watchConfig[key];

        // 在监控多个数据时,参数是多个值
        observersConfig[key] = function(this: Instance, ...newValue: unknown[]) {
          const watchOldValue = this.__watchOldValue__!;
          const oldValue = watchOldValue[key];
          if (isEqual(newValue, oldValue)) return;
          watchOldValue[key] = deepClone(newValue);

          watchHadle.call(this, ...newValue, ...oldValue);
        };
      }
    }
  },
  lifetimes: {
    created(this: Instance) {
      // 把计算属性的初始缓存放入实例
      const __computedInitCache__ = this.__computedInitCache__?.();

      this.__computedCache__ = __computedInitCache__;

      deleteProtoField(this, "__computedInitCache__");

      this.__computedStatus__ = "待更新";

      this.__computedUpdater__ = computedUpdater.bind(this);

      // 初始化watch 生成OldValue
      const watchConfig = this.__watchConfig__?.();

      deleteProtoField(this, "__watchConfig__");

      if (watchConfig) {
        this.__watchOldValue__ = initWatchOldValue.call(this, watchConfig);
      }
    },
  },
});
