import type { Func } from "hry-types/src/Misc/_api";
import { BBeforeCreate } from "../../../behaviors/BbeforeCreated";

import { BthrottleDebounce } from "../../../behaviors/BthrottleDebounce";
import { applyDebounceAndThrottle } from "../../../utils/applyDebounceAndThrottle";
import { isEmptyObject } from "../../../utils/isEmptyObject";
import { instanceConfig } from "../../InstanceInject/instanceConfig";
import type { ComputedConstraint } from "../../RootComponent/Computed/ComputedConstraint";
import type { DataConstraint } from "../../RootComponent/Data/DataConstraint";
import type { LifetimesConstraint } from "../../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../../RootComponent/PageLifetimes/PageLifetimesOption";
import type { PropertiesConstraint } from "../../RootComponent/Properties/PropertiesConstraint";
import type { StoreConstraint } from "../../RootComponent/Store/StoreConstraint";
import type { DefineComponentOption } from "..";
import { __throttleDebounce__FieldCheck } from "./__throttleDebounce__FieldCheck";
import type { ComputedCache } from "./computedWatchHandle/initComputedAndGetCache";
import { initStore } from "./handleStore/initStore";
import { hijack } from "./hijackHandle";
import { isPageCheck } from "./hijackHandle/isPageCheck";
import { loadReceivedDataHandle } from "./hijackHandle/loadReceivedDataHandle";
import { onLoadReceivedDataHandle } from "./hijackHandle/onLoadReceivedDataHandle";
import { pagePathCheck } from "./hijackHandle/pagePathCheck";
import { injectInfoHandler } from "./injectInfoHandler";
import { InternalFieldProtection } from "./internalFieldProtection";
import { rootComponentOptionHandle } from "./rootComponentOptionHandle";
import { sameFuncOptionsHandle } from "./sameFuncOptionsHandle";
// import { slotComponentOptionHandle } from "./slotComponentsOptionHandle";
import { disposeStore } from "./handleStore/disposeStore";
import { subComponentsOptionHandle } from "./subComponentsOptionHandle";

export type WatchOldValue = Record<string, unknown[]>;
export type ThrottleDebounce = Partial<Record<"throttle" | "debounce", Record<string, number>>>;
export type OptionsInnerFields = {
  data: {
    __computedCache__?: ComputedCache;
    __watchOldValue__?: WatchOldValue;
    __throttleDebounce__?: ThrottleDebounce;
  };
  methods: {
    __computedUpdater__?: Func;
  };
};

/**
 * 临时的函数配置项
 * 把根组件与子组件中配置类型为函数的相同字段配置收集在一起(数组)
 */
export type SameFuncOptions = Record<"pageLifetimes" | "lifetimes" | "watch" | "observers", Record<string, Func[]>>;

/**
 * 最终传入原生Component的配置项
 */
export type FinalOptionsOfComponent = {
  data: DataConstraint & OptionsInnerFields["data"];
  observers: Record<string, Func>;
  behaviors: string[];
  methods: MethodsConstraint;
  externalClasses: string[];
  pageLifetimes: PageLifetimesOption<false, object>["pageLifetimes"] & {};
  isPage: boolean;
  options: WechatMiniprogram.Component.ComponentOptions;
  properties: PropertiesConstraint;
  store?: StoreConstraint;
  computed: ComputedConstraint;
  watch: Record<string, Func>;
  lifetimes: LifetimesConstraint;
};

/**
 * 把DefineComponentOption转化为原生Component API支持的配置
 * @param defineComponentOption
 * @returns  返回符合原生Component API配置
 */
export function normalizeOptions(
  defineComponentOption: DefineComponentOption,
): FinalOptionsOfComponent {
  const rootComponentOption = defineComponentOption.rootComponent;
  const subComponentsOptions = defineComponentOption.subComponents;
  // const slotComponentOptions = defineComponentOption.slotComponents;
  const finalOptionsForComponent: FinalOptionsOfComponent = injectInfoHandler({
    observers: {},
    data: {},
    methods: {},
    // 加入BStore,处理store字段的behavior
    behaviors: [BthrottleDebounce],
    externalClasses: [],
    pageLifetimes: {},
    isPage: false,
    properties: {},
    computed: {},
    watch: {},
    lifetimes: {},
    options: {},
  }, instanceConfig.injectInfo);

  /**
   * 为了更高的效率,在处理rootComponentOption和subComponentsOption数据时,把相同字段配置(pageLifetimes，lifetimes,watch,observers)收集到funcOptions中。
   * 后续再一起处理这些字段,整合进finalOptionsForComponent配置中。即funcConfig是一个临时中介对象。
   */
  const sameFuncOptions: SameFuncOptions = {
    pageLifetimes: {},
    lifetimes: {},
    watch: {},
    observers: {},
  };

  if (rootComponentOption && !isEmptyObject(rootComponentOption)) {
    // 验证配置中是否有内部字段__throttleDebounce__,有则报错,因为在rootComponentOptionHandle中会加入__throttleDebounce__字段到data中
    __throttleDebounce__FieldCheck(rootComponentOption);
    rootComponentOptionHandle(finalOptionsForComponent, rootComponentOption, sameFuncOptions);
  }
  if (subComponentsOptions && subComponentsOptions.length !== 0) {
    // 验证配置中是否有内部字段__throttleDebounce__,有则报错,因为在rootComponentOptionHandle中会加入__throttleDebounce__字段到data中
    __throttleDebounce__FieldCheck(subComponentsOptions);
    subComponentsOptionHandle(finalOptionsForComponent, subComponentsOptions, sameFuncOptions);
  }

  sameFuncOptionsHandle(finalOptionsForComponent, rootComponentOption?.isPage, sameFuncOptions);

  // 配置与内部字段冲突验证
  InternalFieldProtection(finalOptionsForComponent);

  // 对页面传入参数进行处理 老框架劫持页面methods.onLoad,新框架劫持页面pageLifetimes.load
  if (finalOptionsForComponent.isPage) {
    hijack(finalOptionsForComponent.pageLifetimes, "load", [loadReceivedDataHandle]);
  }

  hijack(finalOptionsForComponent.methods, "onLoad", [onLoadReceivedDataHandle]);

  // 验证isPage字段是否配置正确
  hijack(
    finalOptionsForComponent.lifetimes,
    "attached",
    [
      isPageCheck(rootComponentOption?.isPage),
      pagePathCheck(defineComponentOption.path),
      initStore(finalOptionsForComponent),
      // () => computedWatchHandle(finalOptionsForComponent),
    ],
  );
  hijack(
    finalOptionsForComponent.lifetimes,
    "detached",
    [disposeStore],
  );
  // 页面时删除预设的虚拟组件字段
  if (finalOptionsForComponent.isPage && finalOptionsForComponent.options) {
    Reflect.deleteProperty(finalOptionsForComponent.options, "virtualHost");
  }

  // 处理debounce和throttle前缀的方法(事件)配置
  applyDebounceAndThrottle(finalOptionsForComponent.methods);

  // 初始化store数据到data并把store配置放入到data的__storeConfig__下为后续使用
  // initStore(finalOptionsForComponent);

  // 处理computed和watch配置
  // computedWatchHandle(finalOptionsForComponent);
  // 在rootComponentOptionHandle中保留了防抖节流配置,这里处理后,删除data.__throttleDebounce__字段

  // BBeforeCreate在最后面,让BeforeCreate生命周期运行在最终建立组件时。
  finalOptionsForComponent.behaviors.push(BBeforeCreate);

  return finalOptionsForComponent;
}
