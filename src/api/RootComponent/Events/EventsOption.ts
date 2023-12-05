export type EventsOption<TEvents extends object> = {
  /**
   * 根组件事件字段,当RootComopnent传入组件泛型时,有子组件事件提示
   *
   * @example A 无子组件时
   * ```ts
   * RootComponent()({
   *  events: {
   *    onTap(e) {
   *      Checking<typeof e, WMBaseEvent, Test.Pass>;
   *    },
   *  },
   * });
   * ```
   * @example B
   * ```ts
   * type ComponentDocA = {
   *  customEvents: {
   *    aaa_str: string;
   *    aaa_num: number | Bubbles;
   *  };
   * };
   *
   * type ComponentDocB = {
   *  customEvents: {
   *    bbb_str: string;
   *    bbb_num: number | Capture;
   *  };
   * };
   * RootComponent<[ComponentDocA, ComponentDocB]>()({
   *  events: {
   *    // 后缀bubbles表示为子组件的冒泡事件
   *    aaa_num_bubbles(e) {
   *      Checking<typeof e.detail, number, Test.Pass>;
   *    },
   *    // 后缀加catch表示阻止事件传递,当前组件类型将不会向上传递此事件类型。
   *    aaa_num_bubbles_catch(e) {
   *      Checking<typeof e.detail, number, Test.Pass>;
   *    },
   *    // 后缀capture表示是捕获事件
   *    bbb_num_capture(e: Dataset<{ currentTargetDataset: number }, { targetDataset: string }, number>) {
   *      Checking<typeof e.detail, number, Test.Pass>;
   *      Checking<typeof e.currentTarget.dataset.currentTargetDataset, number, Test.Pass>;
   *      Checking<typeof e.target.dataset.targetDataset, string, Test.Pass>;
   *    },
   *    // 后缀加catch表示阻止事件传递,由于捕获事件向下阻止,所以当发现捕获事件不触发时应查看上级组件是否有阻止事件。
   *    bbb_num_capture_catch(e) {
   *      Checking<typeof e.detail, number, Test.Pass>;
   *    },
   *  },
   * });
   * ```
   */
  events?: TEvents;
};
