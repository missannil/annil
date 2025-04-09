import type { Bubbles } from "../../api/RootComponent/CustomEvents/CustomEventsTag";
import type { WMBaseEvent } from "../../types/OfficialTypeAlias";

export type BaseEvents = {
  // [key: string]: WMBaseEvent | Bubbles;
  /**
   * 手指触摸动作开始
   */
  touchstart: WMBaseEvent | Bubbles;
  /**
   * 手指触摸后移动
   */
  touchmove: WMBaseEvent | Bubbles;
  /**
   * 手指触摸动作被打断，如来电提醒，弹窗
   */
  touchcancel: WMBaseEvent | Bubbles;
  /**
   * 手指触摸动作结束
   */
  touchend: WMBaseEvent | Bubbles;
  /**
   * 手指触摸后马上离开
   */
  tap: WMBaseEvent | Bubbles;
  /**
   * 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发	1.5.0
   */
  longpress: WMBaseEvent | Bubbles;
  /**
   * 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
   */
  longtap: WMBaseEvent | Bubbles;
  /**
   * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
   */
  transitionend: WMBaseEvent | Bubbles;
  /**
   * 会在一个 WXSS animation 动画开始时触发
   */
  animationstart: WMBaseEvent | Bubbles;
  /**
   * 会在一个 WXSS animation 一次迭代结束时触发
   */
  animationiteration: WMBaseEvent | Bubbles;
  /**
   * 会在一个 WXSS animation 动画完成时触发
   */
  animationend: WMBaseEvent | Bubbles;
  /**
   * 在支持 3D Touch 的 iPhone 设备，重按时会触发  1.9.90
   */
  touchforcechange: WMBaseEvent | Bubbles;
};
