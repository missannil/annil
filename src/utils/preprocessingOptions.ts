import type { Func } from "hry-types/src/Misc/Func";
import { comparer, reaction, toJS } from "mobx";
import type { ComponentOptions, FuncConfig } from "../api/DefineComponent";

import type { FullCustomEvents, ShortCustomeEvents } from "../api/RootComponent/CustomEvents/CustomEventConstraint";
import type { PageInstance } from "../api/RootComponent/Instance/RootComponentInstance";
import type { RootComponentDoc } from "../api/RootComponent/RootComponentDoc";
import type { SubComponentOptions } from "../api/SubComponent";
import type { InstanceInner } from "../behaviors/BComputedAndWatch/types";
import { deepClone } from "./deepClone";
import { INNERMARKER } from "./InnerMarker";

// 类型守卫
function IsFullCustomEvents(
  customEventOptions: FullCustomEvents | ShortCustomeEvents,
): customEventOptions is FullCustomEvents {
  return Object.prototype.toString.call(customEventOptions) === "[object Object]";
}
/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
function customEventsHandle(componentOptions: ComponentOptions, customEventsConfig: object) {
  componentOptions.methods ||= {};

  for (const key in customEventsConfig) {
    const customEventOptions = customEventsConfig[key];
    if (IsFullCustomEvents(customEventOptions)) {
      componentOptions.methods[key] = function(detail: unknown) {
        this.triggerEvents(key, detail, customEventOptions.options);
      };
    } else {
      componentOptions.methods[key] = function(detail: unknown) {
        this.triggerEvents(key, detail);
      };
    }
  }
}
/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
function eventsHandle(componentOptions: ComponentOptions, eventsConfig: object) {
  componentOptions.methods ||= {};

  Object.assign(componentOptions.methods, eventsConfig);
}
/**
 * 把配置为函数的字段方法收集到funcConfig中
 */
function funcFieldsCollect(
  config: Record<string, Func>,
  funcConfig: FuncConfig,
  type: "pageLifetimes" | "lifetimes" | "watch",
) {
  for (const key in config) {
    const handler = config[key];
    // 收集声明周期函数
    const tempCache: object = funcConfig[type] ||= {};
    const filedList: Func[] = tempCache[key] ||= [];

    filedList.push(handler);
  }
}
// 其他字段加入到componentOptions对应字段配置中
function otherFieldsHandle(
  componentOptions: ComponentOptions,
  rootComponentOptions: Omit<RootComponentDoc, "customEvents" | "events" | "pageLifetimes">,
) {
  for (const key in rootComponentOptions) {
    const config = rootComponentOptions[key];
    if (Array.isArray(config)) {
      componentOptions[key] ||= ([] as any[]).push(...config);
    } else {
      Object.assign(componentOptions[key] ||= {}, config);
    }
  }
}
export function rootComponentFieldHandle(
  rootComponentConfig: RootComponentDoc,
  componentOptions: ComponentOptions,
  funcConfig: FuncConfig,
) {
  rootComponentConfig.customEvents && customEventsHandle(componentOptions, rootComponentConfig.customEvents);

  rootComponentConfig.events && eventsHandle(componentOptions, rootComponentConfig.events);

  rootComponentConfig.pageLifetimes
    && funcFieldsCollect(rootComponentConfig.pageLifetimes, funcConfig, "pageLifetimes");

  rootComponentConfig.lifetimes && funcFieldsCollect(rootComponentConfig.lifetimes, funcConfig, "lifetimes");

  rootComponentConfig.watch && funcFieldsCollect(rootComponentConfig.watch, funcConfig, "watch");

  otherFieldsHandle(componentOptions, rootComponentConfig);
}

export function subComponentsHandle(
  componentOptions: ComponentOptions,
  subComponents: SubComponentOptions[],
  funcConfig: FuncConfig,
) {
  subComponents.forEach((subOption) => {
    subOption.events && eventsHandle(componentOptions, subOption.events);

    subOption.pageLifetimes && funcFieldsCollect(subOption.pageLifetimes, funcConfig, "pageLifetimes");

    subOption.lifetimes && funcFieldsCollect(subOption.lifetimes, funcConfig, "lifetimes");

    subOption.watch && funcFieldsCollect(subOption.watch, funcConfig, "watch");

    otherFieldsHandle(componentOptions, subOption);
  });
}

/**
 * 把函数配置放入一个配置中依次运行
 */
function funcCofnigHandle(methodsConfig: object, configList: Record<string, Func[]>) {
  for (const key in configList) {
    methodsConfig[key] = function(...args: unknown[]) {
      configList[key].forEach(ele => ele.call(this, ...args));
    };
  }
}

export function funcConfigHandle(
  componentOptions: ComponentOptions,
  isPage: boolean | undefined,
  funcConfig: FuncConfig,
) {
  if (isPage) {
    // 页面时 生命周期方法(即 on 开头的方法),(https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
    funcConfig.pageLifetimes && funcCofnigHandle(componentOptions.methods ||= {}, funcConfig.pageLifetimes);
  } else {
    // 组件时
    funcConfig.pageLifetimes && funcCofnigHandle(componentOptions.pageLifetimes ||= {}, funcConfig.pageLifetimes);
  }
  funcConfig.lifetimes && funcCofnigHandle(componentOptions.lifetimes ||= {}, funcConfig.lifetimes);

  funcConfig.watch && funcCofnigHandle(componentOptions.watch ||= {}, funcConfig.watch);
}

export function createdHijack(
  componentOptions: ComponentOptions,
  before: Func[] = [],
  after: Func[] = [],
) {
  const lifetimes = componentOptions.lifetimes ||= {};
  // const originalOptions = deepClone(options);
  const originalCreatedFn = lifetimes.created;

  lifetimes.created = function() {
    before.forEach((func) => {
      func.call(this, componentOptions);
    });

    originalCreatedFn && originalCreatedFn.call(this);

    after.forEach((func) => {
      func.call(this, componentOptions);
    });
  };
}

/**
 * 把computed配置加入到methods中,带入到组件实例中
 */
export function addComputedFieldToMethods(componentOptions: ComponentOptions) {
  componentOptions.methods ??= {};

  componentOptions.methods.__computedConfig__ = () => componentOptions.computed;

  componentOptions.methods.xxx = () => ({
    a() {
      return 123;
    },
    b: 345,
  });
  // delete componentOptions.computed;
}

/**
 * 把state配置加入到methods中,带入到组件实例中
 */
export function addStateConfigToMethods(componentOptions: ComponentOptions) {
  // 把响应式数据配置保留在methods的__stateConfig__字段下带入到组件实例中(不用函数返回方式也可以,但不符合methods字段类型),后续再从原型上删除。
  componentOptions.methods ||= {};

  const stateConfig = componentOptions.state;

  componentOptions.methods.__stateConfig__ = () => stateConfig;

  delete componentOptions.state;
}

export function attachedHijack(
  componentOptions: ComponentOptions,
  beforeHandleList: Func[] = [],
  afterHandleList: Func[] = [],
) {
  componentOptions.lifetimes ??= {};

  const originAttached = componentOptions.lifetimes.attached;

  componentOptions.lifetimes.attached = function() {
    beforeHandleList.forEach(handleFunc => {
      handleFunc.call(this);
    });

    originAttached && originAttached.call(this);

    afterHandleList.forEach(handleFunc => {
      handleFunc.call(this);
    });
  };
}

export function detachedHijack(
  componentOptions: ComponentOptions,
  beforeHandleList: Func[] = [],
  afterHandleList: Func[] = [],
) {
  componentOptions.lifetimes ??= {};

  const originDetached = componentOptions.lifetimes.detached;

  componentOptions.lifetimes.detached = function() {
    beforeHandleList.forEach(handleFunc => {
      handleFunc.call(this);
    });

    originDetached && originDetached.call(this);

    afterHandleList.forEach(handleFunc => {
      handleFunc.call(this);
    });
  };
}

export function stateHandle(this: InstanceInner) {
  // 取出通过methods带入的responsiveConfig
  const responsiveConfig = this.__stateConfig__?.();
  if (!responsiveConfig) return;
  for (const key in responsiveConfig) {
    // 占用this的key,未对有可能的键冲突做处理
    this.disposer ||= {};

    // 添加响应式逻辑
    this.disposer[key] = reaction(
      responsiveConfig[key],
      (value: unknown) => {
        // 加入到待setData对象中
        this.setData({
          [key]: toJS(value),
        });
      },
      {
        equals: comparer.default,
        // fireImmediately: false,
      },
    );
  }
  //  methods属性是加载在实例原型上的
  Reflect.deleteProperty((this as any).__proto__, "__stateConfig__");
}

/**
 * 配置中排除指定字段(报错)
 */
export function excludeFields(config: object, excludeKeys: string[]) {
  const methodsConfigKeys = Object.keys(config);
  for (const key of excludeKeys) {
    if (methodsConfigKeys.includes(key)) {
      throw Error(`${key}已被内部字段占用`);
    }
  }
}

/**
 * onLoad生命周期劫持函数
 */
export function onLoadHijack(
  options: ComponentOptions,
  before: Func[],
  after: Func[] = [],
) {
  options.methods ||= {};

  const cloneOpt = deepClone(options);
  const originalOnLoad: Func | undefined = options.methods.onLoad;

  options.methods.onLoad = function(opt: unknown) {
    before.forEach((func) => {
      func.call(this, opt, cloneOpt);
    });

    originalOnLoad?.call(this, opt);

    after.forEach((func) => {
      func.call(this, opt, cloneOpt);
    });
  };
}

/**
 * 对页面onLoad的参数data处理
 * 1. 多余字段检测
 * 2. 少传字段报错
 * 3. 类型错误报错
 * 针对通过 navigateTo传过来的数据解析
 */
/**
 * @param option - option中的url是拼接了encodeURIComponent转码的data对象的,key为INNERMARKER.url
 */
export function onLoadReceivedDataHandle(
  this: PageInstance,
  option: Record<typeof INNERMARKER.url, string>,
) {
  const innerData: string | undefined = option[INNERMARKER.url];
  // 未使用自定义的navigateTo
  if (innerData === undefined) return;
  const optionData = JSON.parse(decodeURIComponent(innerData));

  // 使用navigateTo
  for (const key in optionData) {
    option[key] = optionData[key];
  }

  // setData会触发计算属性 继承属性等 。
  this.setData(option as any);

  delete option[INNERMARKER.url];

  delete this.data[INNERMARKER.url];
}
