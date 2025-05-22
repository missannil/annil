import type { Func } from "hry-types/src/Misc/_api";
import { BBeforeCreate } from "../../../behaviors/BbeforeCreated";
import { BthrottleDebounce } from "../../../behaviors/BthrottleDebounce";
import { applyDebounceAndThrottle } from "../../../utils/applyDebounceAndThrottle";
import { instanceConfig } from "../../InstanceInject/instanceConfig";
import type { ComputedConstraint } from "../../RootComponent/Computed/ComputedConstraint";
import type { DataConstraint } from "../../RootComponent/Data/DataConstraint";
import type { LifetimesConstraint } from "../../RootComponent/Lifetimes/LifetimesConstraint";
import type { MethodsConstraint } from "../../RootComponent/Methods/MethodsConstraint";
import type { PageLifetimesOption } from "../../RootComponent/PageLifetimes/PageLifetimesOption";
import type { PropertiesConstraint } from "../../RootComponent/Properties/PropertiesConstraint";
import type { StoreConstraint } from "../../RootComponent/Store/StoreConstraint";
import type { DefineComponentOption } from "..";
import { handleRootComponent } from "./handleRootComponent";
import { handleSubComponents } from "./handleSubComponents";
import { hijackHandle } from "./hijackHandle";
import type { ComputedCache } from "./initComputed/initComputedAndGetCache";
import { injectInfoHandler } from "./injectInfoHandler";
import { InternalFieldProtection } from "./internalFieldProtection";
import { sameFuncOptionsHandle } from "./sameFuncOptionsHandle";
import { watchHandler } from "./watchHandler";
// 因为watch字段可能有多个变量,所以在这里定义的value是一个数组
export type WatchOldValue = Record<string, unknown[]>;
export type ThrottleDebounce = Partial<Record<"throttle" | "debounce", Record<string, number>>>;
export type OptionsInnerFields = {
  data: {
    __storeInited__?: boolean;
    // 在attach周期结束后,为data.attached赋值为true
    attached?: boolean;
    // // 为data.attached赋值为true时会触发Observers["**"]的回调函数,进而运行computedUpdater,所以要设置一个标志位来避免触发computedUpdater。因为这是无意义的。
    __computedInited__?: boolean;
    __oberverHandler__?: Func[];
    __computedCache__?: ComputedCache;
    __watchOldValue__?: WatchOldValue;
    __throttleDebounce__?: ThrottleDebounce;
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
  const { rootComponent, subComponents, path } = defineComponentOption;
  const isPage = rootComponent?.isPage ?? false;
  const finalOptionsForComponent: FinalOptionsOfComponent = {
    observers: {},
    data: {},
    methods: {},
    behaviors: [BthrottleDebounce],
    externalClasses: [],
    pageLifetimes: {},
    isPage,
    properties: {},
    computed: {},
    watch: {},
    lifetimes: {},
    options: {},
  };
  // 处理注入的实例配置项
  injectInfoHandler(finalOptionsForComponent, instanceConfig.injectInfo);
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

  handleRootComponent(finalOptionsForComponent, rootComponent, sameFuncOptions);

  handleSubComponents(finalOptionsForComponent, subComponents, sameFuncOptions);

  sameFuncOptionsHandle(finalOptionsForComponent, isPage, sameFuncOptions);

  // 配置与内部字段冲突验证
  InternalFieldProtection(finalOptionsForComponent);

  // 页面时删除预设的虚拟组件字段
  if (isPage && finalOptionsForComponent.options) {
    Reflect.deleteProperty(finalOptionsForComponent.options, "virtualHost");
  }

  // 处理debounce和throttle前缀的方法(事件)配置
  applyDebounceAndThrottle(finalOptionsForComponent.methods);

  // 处理watch配置,注意的是 oldValue中的计算属性初始赋值在计算属性初始化完毕后,即计算属性初始化后,再变化时才会被watch到。
  watchHandler(finalOptionsForComponent);

  // BBeforeCreate在最后面,让BeforeCreate生命周期运行在最终建立组件时。用于测试。
  finalOptionsForComponent.behaviors.push(BBeforeCreate);

  // 劫持函数的处理
  hijackHandle(finalOptionsForComponent, isPage, path);

  return finalOptionsForComponent;
}

/**
 * computed设计逻辑
 * 在之前的设计中,计算属性的初始化发生在beforeCreate阶段,通过通过监控observers["**"]来触发计算属性的更新。
 * 有一些问题如下:
 *   1. 如果依赖属性是properties的情况下(实际上大多数时候都是)初始化时的数据是无意义的,因为beforeCreate阶段properties数据还没传入。
 * 如果想节省调用(可减少组件渲染时间),应该在properties数据传入后再初始化计算属性,且让初始化时发生的setData不引起watch和observers的响应。什么时候properties已经传入呢?那就是挂载阶段,可是小程序只有attached钩子,只能通过observers["**"]的第一次触发模拟attach周期(只要传入了properties字段定义的属性那么,observers.**就好比attach周期了,会在attached周期之前触发）。需要注意的是如果没有定义properties字段或者传入的属性不在properties中,那么observers["**"]就不会在attached之前触发,所以在attached阶段要做一次检测,如果没有初始化计算属性,就在这个周期中初始化计算属性。
 * 在计算属性初始化函数中,要检测this.data.__computedCache__是否存在,如果存在就表示已经初始化过了,否则初始化计算属性,并把__initializing__设置为true。这样就可以避免在初始化计算属性时用到setData时,引起watch和observers的触发(watch的回调在执行前判断__initializing__,如果为false才执行)。
 * 还有一个问题就是watch的oldValue,在watch的初始化函数中只针对不包含计算属性的path进行赋值,这样不影响非计算属性的监控。在计算属性初始化完毕后,再对包含计算属性的path进行赋值。这样oldValue的值才是正确的。这样可避免在observers.path中使用计算属性而报错。
 *
 * 整体实现思路:
 * 1. 劫持observers["**"]事件,在observers["**"]触发时,看data.__computedCache__是否存在,如果不存在,就初始化计算属性。并把data.__computedCache__赋值为true。
 * 2. 劫持attached事件,在attached阶段,如果data.__computedCache__不存在,就初始化计算属性。并把data.__computedCache__赋值为true。
 * 这样j
 */
