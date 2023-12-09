import type { Func } from "hry-types/src/Misc/_api";
import { BBeforeCreate } from "../../behaviors/BbeforeCreated";
import { BComputedAndWatch } from "../../behaviors/BComputedAndWatch";
import { initComputed } from "../../behaviors/BComputedAndWatch/initComputed";
import type { Instance } from "../../behaviors/BComputedAndWatch/types";
import { BStore } from "../../behaviors/BStore";
import type { WMComponent } from "../../types/OfficialTypeAlias";
import { INNERMARKER } from "../../utils/InnerMarker";
import { isEmptyObject } from "../../utils/isEmptyObject";
import type { RootComponentTrueOptions } from "../RootComponent";
import type { ComputedConstraint } from "../RootComponent/Computed/ComputedConstraint";
import type {
  CustomEventConstraint,
  CustomEvents,
  FullCustomEvents,
} from "../RootComponent/CustomEvents/CustomEventConstraint";
import type { DataConstraint } from "../RootComponent/Data/DataConstraint";
import type { EventsConstraint } from "../RootComponent/Events/EventsConstraint";
import type { PageInstance } from "../RootComponent/Instance/RootComponentInstance";
import type { LifetimesConstraint } from "../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../RootComponent/PageLifetimes/PageLifetimesOption";
import type { StoreConstraint } from "../RootComponent/Store/StoreConstraint";
import type { SubComponentTrueOptions } from "../SubComponent";
import type { DefineComponentOption } from ".";
/**
 * 临时的函数配置项
 * 把根组件与子组件中配置类型为函数的相同字段配置收集在一起(数组)
 */
export type FuncOptions = Record<"pageLifetimes" | "lifetimes" | "watch", Record<string, Func[]>>;

/**
 * 最终传入原生Component的配置项
 */
export type FinalOptionsOfComponent = {
  isPage?: boolean;
  options?: WMComponent.Options;
  properties?: Record<string, any>;
  data?: DataConstraint;
  store?: StoreConstraint;
  computed?: ComputedConstraint;
  observers?: Record<string, Func>;
  behaviors?: string[];
  methods?: MethodsConstraint;
  watch?: Record<string, Func>;
  lifetimes?: LifetimesConstraint;
} & PageLifetimesOption<false, object>;

/**
 * 原生Component会对传入的对象字段匹配的properties字段setData赋值。不符合字段或Page时不会赋值。
 * 此函数为给实例setData赋值,默认传递值与properties相符(ts类型安全)。
 * @param option - 传入onLoad的参数 有以下两种可能
 * 1. 使用wx.navigateTo传值的。这种情况无内置字段 option[INNERMARKER.url] 等于 undefined
 * 2. 使用插件提供的navigateTo传值。这种情况 INNERMARKER.url被load周期劫持函数解码后赋值INNERMARKER.url字段为本身,即option[INNERMARKER.url] 等于 INNERMARKER.url
 */
/* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
function onLoadReceivedDataHandle(
  this: PageInstance,
  option: Record<typeof INNERMARKER.url, string>,
) {
  const innerData: string | undefined = option[INNERMARKER.url];

  // 情况1为undefined,2为INNERMARKER.url有值但不是本身,说明没有组件中的写了load(因为组件的load提前解析这个参数),3所以innerData等于 INNERMARKER.url即有组件配置了load(提前解析了)
  if (innerData === undefined) return;
  if (innerData !== INNERMARKER.url) {
    // 需要情况2 需要解析
    const decodeOption = JSON.parse(decodeURIComponent(innerData));
    for (const key in decodeOption) {
      option[key] = decodeOption[key];
    }
  }

  delete option[INNERMARKER.url];

  this.setData(option);
}
// 类型保护
// function isPageInstance(ins: Instance): ins is PageInstance & InstanceCustomFields {
//   return (ins as PageInstance).route !== undefined;
// }
/**
 * 验证path是否正确
 * @param path - 配置路径
 * @returns
 */
// function pathCheck(path: string | undefined) {
//   return function(this: Instance) {
//     if (isPageInstance(this)) {
//       const route = this.route;
//       if (route !== path) {
//         throw Error(
//           `[ /${route} ] DefinedComponent的配置字段path值错误,应为: /${route}`,
//         );
//       }
//     }
//   };
// }
/**
 * 针对通过 navigateTo传过来的数据对组件load周期传入数据解析
 * @param option - option中的url是拼接了encodeURIComponent转码的data对象的,key为INNERMARKER.url
 */
/* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
function loadReceivedDataHandle(
  this: PageInstance,
  option: Record<typeof INNERMARKER.url, string>,
) {
  const innerData: string | undefined = option[INNERMARKER.url];
  // 未使用自定义的navigateTo 或者在之前的load中已经被解析过了
  if (innerData === undefined || innerData == INNERMARKER.url) return;
  const decodeOption = JSON.parse(decodeURIComponent(innerData));

  // 使用navigateTo API
  for (const key in decodeOption) {
    option[key] = decodeOption[key];
  }
  // 给onLoad劫持函数一个标记,判断传值来自哪个API
  option[INNERMARKER.url] = INNERMARKER.url;
}
/**
 * 劫持指定配置字段
 */
/* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
function hijack(config: object, field: string, before: Func[] = [], after: Func[] = []) {
  const originalFunc: Func | undefined = config[field];

  config[field] = function(...args: any[]) {
    before.forEach(func => func.call(this, ...args));

    originalFunc && originalFunc.apply(this, args);

    after.forEach(func => func.call(this, ...args));
  };

  return;
}

/**
 * 报错的形式避免输入字段和内部字段冲突,保证config下不包含内部预定字段(列表)
 */
/* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
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
/**
 * 把函数列表配置放入一个配置中循环一次运行
 */
function funcConfigHandle(
  finalOptionsForComponent: FinalOptionsOfComponent,
  isPage: boolean | undefined,
  funcOptions: FuncOptions,
) {
  // 测试框架无法测试page情形
  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
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

/**
 * 其他字段加入到componentOptions对应字段配置中
 */
function otherFieldsHandle(
  finalOptions: FinalOptionsOfComponent,
  rootComponentOptions: RootComponentTrueOptions,
) {
  for (const key in rootComponentOptions) {
    const config = rootComponentOptions[key];
    if (Array.isArray(config)) {
      // 好像只有behaviors是数组吧.
      /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
      (finalOptions[key] ||= []).push(...config);
    } else {
      Object.assign(finalOptions[key] ||= {}, config);
    }
  }
}
/**
 * 把events字段放入到componentOptions.methods中
 */
function eventsHandle(componentOptions: FinalOptionsOfComponent, eventsConfig: EventsConstraint) {
  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
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
  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
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
  defineComponentOption: DefineComponentOption,
): FinalOptionsOfComponent {
  const rootComponentOption = defineComponentOption.rootComponent;
  const subComponentsList = defineComponentOption.subComponents;
  const finalOptionsForComponent: FinalOptionsOfComponent = {
    // default options
    options: {
      addGlobalClass: true, // "styleIsolation": "apply-shared"
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
  // miniprogram-simulate(当前版本 1.6.1) 无法测试页面
  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
  funcConfigHandle(finalOptionsForComponent, rootComponentOption?.isPage, funcOptions);

  finalOptionsForComponent.methods && InternalFieldProtection(finalOptionsForComponent.methods, ["disposer"]);

  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
  finalOptionsForComponent.methods?.onLoad
    && hijack(finalOptionsForComponent.methods, "onLoad", [onLoadReceivedDataHandle, initComputed], []);

  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
  finalOptionsForComponent.pageLifetimes?.load
    && hijack(finalOptionsForComponent.pageLifetimes, "load", [loadReceivedDataHandle], []);

  // hijack(finalOptionsForComponent.lifetimes!, "attached", [pathCheck(defineComponentOption.path)], []);

  /* istanbul ignore next: miniprogram-simulate(当前版本 1.6.1) 无法测试页面 */
  if (finalOptionsForComponent.isPage) {
    // 页面时删除预设的虚拟组件字段
    Reflect.deleteProperty(finalOptionsForComponent.options!, "virtualHost");
  }
  // BBeforeCreate在最后面,让BeforeCreate生命周期运行在最终建立组件时。
  finalOptionsForComponent.behaviors!.push(BBeforeCreate);

  return finalOptionsForComponent;
}
