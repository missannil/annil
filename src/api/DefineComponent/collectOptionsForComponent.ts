import type { Func } from "hry-types/src/Misc/_api";
import { BBeforeCreate } from "../../behaviors/BbeforeCreated";
import { BComputedAndWatch } from "../../behaviors/BComputedAndWatch";
import { initComputed } from "../../behaviors/BComputedAndWatch/initComputed";
import type { Instance } from "../../behaviors/BComputedAndWatch/types";
import { BStore } from "../../behaviors/BStore";
import { deepClone } from "../../utils/deepClone";
import { INNERMARKER } from "../../utils/InnerMarker";
import { isEmptyObject } from "../../utils/isEmptyObject";
import type { RootComponentTrueOptions } from "../RootComponent";
import type {
  CustomEventConstraint,
  CustomEvents,
  FullCustomEvents,
} from "../RootComponent/CustomEvents/CustomEventConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { PageInstance } from "../RootComponent/Instance/RootComponentInstance";
import type { SubComponentTrueOptions } from "../SubComponent";
import type { FinalOptionsOfComponent, FuncOptions } from ".";
/**
 * 针对通过 navigateTo传过来的数据解析
 * @param option - option中的url是拼接了encodeURIComponent转码的data对象的,key为INNERMARKER.url
 */
/* istanbul ignore next */
function onLoadReceivedDataHandle(
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

  Reflect.deleteProperty(this.data, INNERMARKER.url);
}

/**
 * onLoad生命周期劫持函数
 */
/* istanbul ignore next */
function onLoadHijack(
  options: FinalOptionsOfComponent,
  before: Func[],
  after: Func[] = [],
) {
  options.methods ||= {};

  const cloneOpt = deepClone(options);
  const originalOnLoad: Func | undefined = options.methods.onLoad;

  options.methods.onLoad = function(props: unknown) {
    before.forEach((func) => {
      func.call(this, props, cloneOpt);
    });

    originalOnLoad?.call(this, props);

    after.forEach((func) => {
      func.call(this, props, cloneOpt);
    });
  };
}
/**
 * attached生命周期劫持函数
 */
/* istanbul ignore next  */
function attachedHijack(
  options: FinalOptionsOfComponent,
  before: Func[],
  after: Func[] = [],
) {
  /* istanbul ignore next */
  options.lifetimes ||= {};

  const originalAttached: Func | undefined = options.lifetimes.attached;

  options.lifetimes.attached = function() {
    before.forEach((func) => {
      func.call(this, options);
    });

    originalAttached?.call(this);

    /* istanbul ignore next  */
    after.forEach((func) => {
      func.call(this, options);
    });
  };
}
/**
 * 内部保护字段 即不允许配置的字段名(所有方法下)
 */
// const INNERFIELDS = ["disposer"];

/**
 * 报错的形式避免输入字段和内部字段冲突
 * 保护config下不被配置keys包含的内部预定字段
 */
/* istanbul ignore next */
function InternalFieldProtection(config: object | undefined, keys: string[]) {
  if (!config) return;
  const methodsConfigKeys = Object.keys(config);
  for (const key of keys) {
    if (methodsConfigKeys.includes(key)) {
      throw Error(`${key}已被内部字段占用`);
    }
  }
}
/**
 * 把函数配置放入一个配置中依次运行
 */
function _funcConfigHandle(methodsConfig: object, configList: Record<string, Func[]>) {
  for (const key in configList) {
    methodsConfig[key] = function(...args: unknown[]) {
      configList[key].forEach(ele => ele.call(this, ...args));
    };
  }
}

function funcConfigHandle(
  finalOptionsForComponent: FinalOptionsOfComponent,
  isPage: boolean | undefined,
  funcOptions: FuncOptions,
) {
  // 测试框架无法测试page情形
  /* istanbul ignore next */
  if (isPage) {
    // 页面时 生命周期方法(即 on 开头的方法),(https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
    funcOptions.pageLifetimes && _funcConfigHandle(finalOptionsForComponent.methods ||= {}, funcOptions.pageLifetimes);
  } else {
    // 组件时
    funcOptions.pageLifetimes
      && _funcConfigHandle(finalOptionsForComponent.pageLifetimes ||= {}, funcOptions.pageLifetimes);
  }
  funcOptions.lifetimes && _funcConfigHandle(finalOptionsForComponent.lifetimes ||= {}, funcOptions.lifetimes);

  funcOptions.watch && _funcConfigHandle(finalOptionsForComponent.watch ||= {}, funcOptions.watch);
}
/**
 * 把配置为函数的字段方法收集到funcConfig中
 */
function funcFieldsCollect(
  options: SubComponentTrueOptions | RootComponentTrueOptions,
  funcOptions: FuncOptions,
) {
  for (const key in funcOptions) {
    // key = "pageLifetimes" | "lifetimes" | "watch"
    if (options[key]) {
      for (const _key in options[key]) {
        (funcOptions[key][_key] ||= []).push(options[key][_key]);
      }
    }

    Reflect.deleteProperty(options, key);
  }
}

// 其他字段加入到componentOptions对应字段配置中
function otherFieldsHandle(
  finalOptions: FinalOptionsOfComponent,
  rootComponentOptions: RootComponentTrueOptions,
) {
  for (const key in rootComponentOptions) {
    const config = rootComponentOptions[key];
    if (Array.isArray(config)) {
      // 好像只有behaviors是数组吧.
      /* istanbul ignore next */
      (finalOptions[key] ||= []).push(...config);
    } else {
      Object.assign(finalOptions[key] ||= {}, config);
    }
  }
}
/**
 * 把events字段配置变成函数放入到componentOptions.methods中
 */
function eventsHandle(componentOptions: FinalOptionsOfComponent, eventsConfig: EventsConstraint) {
  /* istanbul ignore next */
  componentOptions.methods ||= {};

  Object.assign(componentOptions.methods, eventsConfig);
}
function subComponentsHandle(
  componentOptions: FinalOptionsOfComponent,
  subComponents: SubComponentTrueOptions[],
  funcOptions: FuncOptions,
) {
  subComponents.forEach((subOption) => {
    subOption.events && eventsHandle(componentOptions, subOption.events);

    funcFieldsCollect(subOption, funcOptions);

    otherFieldsHandle(componentOptions, subOption);
  });
}

// 类型守卫
function IsFullCustomEvents(
  customEventOptions: CustomEvents,
): customEventOptions is FullCustomEvents {
  return Object.prototype.toString.call(customEventOptions) === "[object Object]";
}

/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
function customEventsHandle(
  componentOptions: FinalOptionsOfComponent,
  customEventsConfig: CustomEventConstraint,
) {
  /* istanbul ignore next */
  componentOptions.methods ||= {};

  for (const key in customEventsConfig) {
    const customEventOptions = customEventsConfig[key];

    if (IsFullCustomEvents(customEventOptions)) {
      componentOptions.methods[key] = function(this: Instance, detail: unknown) {
        this.triggerEvent(key, detail, customEventOptions.options);
      };
    } else {
      componentOptions.methods[key] = function(this: Instance, detail: unknown) {
        this.triggerEvent(key, detail);
      };
    }
  }
}
/**
 *  触发各个组件的页面load事件
 */
/* istanbul ignore next  */
function triggerCompLoad(this: Instance, props: object) {
  if (!this.__compLoadList__) return;
  this.__compLoadList__.forEach((loadFunc) => {
    loadFunc(props);
  });
}
/* istanbul ignore next  */
function getPageInstance(pageId: string): Instance {
  const pagestack = getCurrentPages() as unknown as Instance[];
  let pageInstance: Instance;
  pagestack.some((instance) => {
    if (instance.getPageId() === pageId) {
      pageInstance = instance;

      return true;
    }

    return false;
  });

  // @ts-ignore pagestack中一定赋值了
  return pageInstance;
}
/**
 * 收集组件pageLifetimes下的load周期函数到页面实例的__loadFunList__
 */
/* istanbul ignore next  */
function collectLoadLifetimesOfComponent(this: Instance, finalOptionsForComponent: FinalOptionsOfComponent) {
  const loadFunc = finalOptionsForComponent.pageLifetimes?.load;

  console.log(loadFunc, finalOptionsForComponent);

  if (!loadFunc) return;

  const pageInstance = getPageInstance(this.getPageId());
  const __compLoadList__: Function[] = (pageInstance.__compLoadList__ ||= []);

  __compLoadList__.push(loadFunc.bind(this));
}
/**
 * 收集 rootComponentOptions 配置到 finalOptions 和 funcOptions 中
 * @param finalOptions - 收集配置对象
 * @param funcOptions  - 收集特殊配置对象字段
 * @param rootComponentOptions - 被收集的源配置对象
 */
function collectRootComponentOption(
  finalOptions: FinalOptionsOfComponent,
  funcOptions: FuncOptions,
  rootComponentOptions: RootComponentTrueOptions,
) {
  console.log("-------------------------");

  InternalFieldProtection(rootComponentOptions.customEvents, ["load"]);

  InternalFieldProtection(rootComponentOptions.methods, ["load"]);

  InternalFieldProtection(rootComponentOptions.events, ["load"]);

  rootComponentOptions.customEvents && customEventsHandle(finalOptions, rootComponentOptions.customEvents);

  delete rootComponentOptions.customEvents;

  rootComponentOptions.events && eventsHandle(finalOptions, rootComponentOptions.events);

  delete rootComponentOptions.events;

  funcFieldsCollect(rootComponentOptions, funcOptions);

  otherFieldsHandle(finalOptions, rootComponentOptions);
}
/**
 * 返回一个由rootComponentOption和subComponentsList配置整合的对象
 * @param rootComponentOption -
 * @param subComponentsList -
 * @returns FinalOptionsForComponent
 */
export function collectOptionsForComponent(
  rootComponentOption: RootComponentTrueOptions | undefined,
  subComponentsList: SubComponentTrueOptions[] | undefined,
): FinalOptionsOfComponent {
  const finalOptionsForComponent: FinalOptionsOfComponent = {
    // default options
    options: {
      // addGlobalClass: true,
      multipleSlots: true,
      pureDataPattern: /^_/,
      virtualHost: true,
    },
    // default behaviors
    behaviors: [BStore, BComputedAndWatch],
  };
  /**
   * 有些字段配置同时存在根组件和子组件当中(如pageLifetimes，lifetimes,watch字段), 且key相同值类型为函数。funcConfig对象用于收集这些配置为数组形式,最终再一起整合进finalOptionsForComponent配置中。即funcConfig是一个临时中介对象。
   */
  const funcOptions: FuncOptions = {
    pageLifetimes: {},
    lifetimes: {},
    watch: {},
  };

  if (rootComponentOption && !isEmptyObject(rootComponentOption)) {
    collectRootComponentOption(finalOptionsForComponent, funcOptions, rootComponentOption);
  }

  if (subComponentsList && !isEmptyObject(subComponentsList)) {
    subComponentsHandle(finalOptionsForComponent, subComponentsList, funcOptions);
  }
  // 框架无法测试页面
  /* istanbul ignore next */
  if (!isEmptyObject(funcOptions)) {
    funcConfigHandle(finalOptionsForComponent, rootComponentOption?.isPage, funcOptions);
  }

  finalOptionsForComponent.methods && InternalFieldProtection(finalOptionsForComponent.methods, ["disposer"]);

  // BBeforeCreate在最后面
  finalOptionsForComponent.behaviors!.push(BBeforeCreate);

  console.log(finalOptionsForComponent, 999, funcOptions);

  attachedHijack(finalOptionsForComponent, [collectLoadLifetimesOfComponent], []);

  onLoadHijack(finalOptionsForComponent, [onLoadReceivedDataHandle, initComputed], [triggerCompLoad]);

  // 框架无法测试页面
  /* istanbul ignore next */
  if (finalOptionsForComponent.isPage) {
    Reflect.deleteProperty(finalOptionsForComponent.options!, "virtualHost");
  }

  return finalOptionsForComponent;
}
